"use server";

import { GITHUB_API_URL } from "@/lib/settings/constants";
import { GitHubHeaders } from "@/lib/utils";

export async function fetchGitHubStats() {
  try {
    const [repoRes, contributorRes, pullRes] = await Promise.all([
      fetch(GITHUB_API_URL, { headers: GitHubHeaders }),
      fetch(`${GITHUB_API_URL}/contributors`, { headers: GitHubHeaders }),
      fetch(`${GITHUB_API_URL}/pulls`, { headers: GitHubHeaders }),
    ]);

    const repo = await repoRes.json();
    const contributors = await contributorRes.json();
    const pulls = await pullRes.json();

    return {
      stars: repo.stargazers_count,
      contributors: contributors.length,
      pulls: pulls.length,
    };
  } catch (error) {
    throw new Error("Error fetching GitHub stats", { cause: error });
  }
}
