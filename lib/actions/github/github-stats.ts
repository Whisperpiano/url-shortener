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
      stars: repo.stargazers_count ?? 0,
      contributors: Array.isArray(contributors) ? contributors.length : 0,
      pulls: Array.isArray(pulls) ? pulls.length : 0,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return {
      stars: 0,
      contributors: 0,
      pulls: 0,
    };
  }
}
