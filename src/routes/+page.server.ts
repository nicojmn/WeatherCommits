import { listPublicRepos, getCommits, commitToDate } from "$lib/github"
import { weatherCodes } from "$lib/meteo";
import type { Commit } from "$lib/types/github"
import type { PageServerLoad } from './$types';

function median(codes: number[]): number {
    const mid = Math.floor(codes.length / 2);
    codes = codes.sort();
    return codes.length % 2 !== 0 ? codes[mid] : (codes[mid - 1] + codes[mid]) / 2;
}

export const load: PageServerLoad = async ({ url }) => {
    const user = url.searchParams.get('user') || "octocat"; // fallback to octocat if no user is provided to avoid errors
    const width = url.searchParams.get('width') || "800"
    const height = url.searchParams.get('height') || "400"

    const repos = await listPublicRepos(user);
    const commits = await Promise.all(
        repos.map((repo) => getCommits(repo, user))
    )
    const flatten = commits.flat()

    const dates = await Promise.all(
        flatten.map((commit: Commit) => commitToDate(commit))
    )

    const codes = await weatherCodes(dates, 50.67, 4.61);
    const med = median(codes);
    console.log("Codes :", codes)
    return {
        codes: {
            median: med
        },
        card: {
            width: width,
            height: height
        }
    };
}
