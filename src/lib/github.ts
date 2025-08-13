import { GITHUB_TOKEN } from "$env/static/private";
import type { Repo, Commit } from "$lib/types/github";
import axios from "axios"
import { Octokit } from "@octokit/rest";


const GH_API_URL = "https://api.github.com"

const api = axios.create({
    baseURL: GH_API_URL,
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
    },
});

const octokit = new Octokit({
    auth: GITHUB_TOKEN,
    baseUrl: GH_API_URL,
    userAgent: "weather-commits v0.0.1"
})



export async function listPublicRepos(username: string): Promise<Repo[]> {
    const resp = await api.get(`${GH_API_URL}/users/${username}/repos?type=public`)
        .catch(error => {
            console.error("Error fetching public repositories:", error)
            return { data: [] }
        })

    return resp.data.map((repo: any) => ({
        name: repo.name,
        owner: repo.owner.login
    }))
}

export async function getCommits(repo: Repo, username: string): Promise<Commit[]> {
    let commits: Commit[] = []

    for await (const response of octokit.paginate.iterator(
        octokit.rest.repos.listCommits,
        {
            owner: repo.owner,
            author: username,
            repo: repo.name,
            per_page: 100,
        })) {
        commits.push(
            ...response.data.map((commit) => ({
                author: commit.commit.author?.name ?? "Unknown",
                date: commit.commit.author?.date ?? "",
            }))
        )
    }
    console.log("Fetched commits:", commits.length)
    return commits
}

export async function commitToDate(commit: Commit) {
    return new Date(commit.date).toISOString()
}
