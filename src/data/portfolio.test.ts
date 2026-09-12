import { describe, expect, it } from "vitest";
import { getFeaturedProjects, getProjectBySlug, getProjectNeighbors, getProjects } from "./portfolio";

describe("portfolio repository", () => {
  it("resolves every published project by its unique slug", () => {
    const projects = getProjects();
    expect(new Set(projects.map(({ slug }) => slug)).size).toBe(projects.length);
    projects.forEach((project) => expect(getProjectBySlug(project.slug)).toEqual(project));
  });

  it("returns only projects marked as featured", () => {
    expect(getFeaturedProjects().map(({ slug }) => slug)).toEqual(["dmit-frontend-web"]);
    expect(getFeaturedProjects()).not.toContainEqual(expect.objectContaining({ slug: "zesky-lab" }));
  });

  it("keeps collaborative work explicitly attributed", () => {
    const kisora = getProjectBySlug("kisora-studio");
    expect(kisora?.ownership).toBe("collaborative");
    expect(kisora?.role).toMatch(/contributor/i);
  });

  it("does not recommend the portfolio itself or unselected studio work", () => {
    expect(getProjectNeighbors("dmit-frontend-web")).toEqual({ previous: undefined, next: undefined });
    expect(getProjectNeighbors("not-a-project")).toEqual({ previous: undefined, next: undefined });
  });

  it("preserves DMIT's two phases and unresolved validation caveats", () => {
    const dmit = getProjectBySlug("dmit-frontend-web");
    expect(dmit?.ownership).toBe("professional");
    expect(dmit?.caseStudy.journey).toHaveLength(2);
    expect(dmit?.caseStudy.journey?.[0].period).toContain("2025");
    expect(dmit?.caseStudy.tradeoffs.join(" ")).toMatch(/ZK9500.*re-testing/);
    expect(dmit?.caseStudy.tradeoffs.join(" ")).toContain("remained under investigation");
  });
});
