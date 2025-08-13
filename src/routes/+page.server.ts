import { listPublicRepos, getCommits, commitToDate } from "$lib/github"
import type { Commit } from "$lib/types/github"
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    let dates: string[] = []
    let user = url.searchParams.get('user') || "octocat"; // fallback to octocat if no user is provided to avoid errors

    const repos = await listPublicRepos(user);
    const commits = await Promise.all(
        repos.map((repo) => getCommits(repo, user))
    )
    commits.flat().forEach((commit: Commit) => {
        commitToDate(commit).then((date => {
            dates.push(date)
        }))
    })
    return { dates };
}
