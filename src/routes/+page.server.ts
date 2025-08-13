import { listPublicRepos, getCommits, commitToDate } from "$lib/github"
import type { Commit } from "$lib/github"
import type { PageServerLoad } from './$types';

let dates: string[] = []


export const load: PageServerLoad = async ({ url }) => {
    let user = url.searchParams.get('user') || "octocat"; // fallback to octocat if no user is provided to avoid errors

    const repos = await listPublicRepos(user);
    repos.forEach((repo) => {
        getCommits(repo).then((commits: Commit[]) => {
            commits.forEach((commit => {
                commitToDate(commit).then(date => {
                    dates.push(date)
                })
            }))
        })
    })
    return { dates };
}
