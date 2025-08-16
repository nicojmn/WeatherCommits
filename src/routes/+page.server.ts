import { listPublicRepos, getCommits, commitToDate } from "$lib/github"
import { weatherCodes, codesMap } from "$lib/meteo";
import type { Commit } from "$lib/types/github"
import type { PageServerLoad } from './$types';

const cmap = codesMap()

function median(codes: number[]): number {
    const mid = Math.floor(codes.length / 2);
    codes = codes.sort();
    return codes.length % 2 !== 0 ? codes[mid] : (codes[mid - 1] + codes[mid]) / 2;
}

export const load: PageServerLoad = async ({ url }) => {
    const user = url.searchParams.get('user') || "octocat"; // fallback to octocat if no user is provided to avoid errors
    const width = url.searchParams.get('width') || "800"
    const height = url.searchParams.get('height') || "400"
    const lat = url.searchParams.get('lat') || "50.67"; // TODO : find a more privacy friendly solution
    const long = url.searchParams.get('long') || "4.61"; // TODO : find a more privacy friendly solution

    const repos = await listPublicRepos(user);
    const commits = await Promise.all(
        repos.map((repo) => getCommits(repo, user))
    )
    const flatten = commits.flat()

    const dates = await Promise.all(
        flatten.map((commit: Commit) => commitToDate(commit))
    )

    const codes = await weatherCodes(dates, parseInt(lat), parseInt(long));
    const med = median(codes);
    console.log("Codes :", codes)
    return {
        codes: {
            median: cmap.get(med) || "unknown",
        },
        card: {
            width: width,
            height: height
        }
    };
}
