import type { Project } from "@/types/portfolio";

export type GitHubRepository = {
  fullName: string;
  url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
  isPrivate: boolean;
};

type GitHubResponse = {
  full_name: string; html_url: string; description: string | null;
  homepage: string | null; language: string | null; stargazers_count: number;
  updated_at: string; private: boolean;
};

export async function getGitHubRepository(repository: Project["githubRepository"]): Promise<GitHubRepository | null> {
  if (!repository) return null;
  const headers: HeadersInit = { Accept: "application/vnd.github+json", "User-Agent": "zesky-lab", "X-GitHub-Api-Version": "2022-11-28" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const response = await fetch(`https://api.github.com/repos/${repository.owner}/${repository.name}`, { headers, next: { revalidate: 3600 } });
    if (!response.ok) return null;
    const data = (await response.json()) as GitHubResponse;
    return { fullName: data.full_name, url: data.html_url, description: data.description, homepage: data.homepage, language: data.language, stars: data.stargazers_count, updatedAt: data.updated_at, isPrivate: data.private };
  } catch { return null; }
}

export async function getProjectRepositories(projects: Project[]) {
  const entries = await Promise.all(projects.map(async (project) => [project.slug, await getGitHubRepository(project.githubRepository)] as const));
  return Object.fromEntries(entries) as Record<string, GitHubRepository | null>;
}
