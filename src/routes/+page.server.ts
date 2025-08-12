import { listPublicRepos, getCommits, commitToDate } from "$lib/github"
import type { Commit } from "$lib/github"
import type { PageServerLoad } from './$types';

let dates: string[] = []

const repos = await listPublicRepos("nicojmn");
repos.forEach((repo) => {
    getCommits(repo).then((commits: Commit[]) => {
        commits.forEach((commit => {
            commitToDate(commit).then(date => {
                dates.push(date)
            })
        }))
    })
})

export const load: PageServerLoad = async () => {
    return { dates };
}
