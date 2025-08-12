import { GITHUB_TOKEN } from "$env/static/private";
import axios from "axios"


const GH_API_URL = "https://api.github.com"

const api = axios.create({
    baseURL: GH_API_URL,
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
    },
});

export interface Repo {
    name: string,
    username: string,
    owner: string
}

export interface Commit {
    author: string,
    date: string,
}

export async function listPublicRepos(username: string): Promise<Repo[]> {
    const resp = await api.get(`${GH_API_URL}/users/${username}/repos?type=public`)
        .catch(error => {
            console.error("Error fetching public repositories:", error)
            return { data: [] }
        })

    return resp.data.map((repo: any) => ({
        name: repo.name,
        username: username,
        owner: repo.owner.login
    }))
}

export async function getCommits(repo: Repo): Promise<Commit[]> {
    const resp = await api.get(`${GH_API_URL}/repos/${repo.owner}/${repo.name}/commits`)

    let commits: Commit[] = resp.data.map((data: any) => ({
        author: data.commit.author.name,
        date: data.commit.author.date
    }))
    return commits
}

export async function commitToDate(commit: Commit) {
    return new Date(commit.date).toISOString()
}
