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

  it("provides deterministic project neighbors", () => {
    const neighbors = getProjectNeighbors("zesky-lab");
    expect(neighbors.previous?.slug).toBe("kisora-studio");
    expect(neighbors.next?.slug).toBe("dmit-frontend-web");
  });
});
