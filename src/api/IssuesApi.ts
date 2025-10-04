import { isAxiosError } from "axios"
import api from "@/lib/axios"
import { Issue, IssueFilters, IssueFormData } from "@/types/index"

type IssueAPI = {
    formData: IssueFormData
    issueId: Issue['_id']
}

export async function createIssue({ formData }: Pick<IssueAPI, 'formData'>) {
    try {
        const { data } = await api.post<string>('/issues', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getIssues(filters: IssueFilters) {   
    try {
        const { data } = await api.get('/issues', {
            params: filters,
        })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getIssueById({ issueId }: Pick<IssueAPI, 'issueId'>) {   
    try {
        const url = `/issues/${issueId}`
        const { data } = await api.get(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function updateIssue({ issueId, formData }: Pick<IssueAPI, 'issueId' | 'formData'>) {   
    try {
        const url = `/issues/${issueId}`
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function deleteIssue({ issueId }: Pick<IssueAPI, 'issueId'>) {   
    try {
        const url = `/issues/${issueId}`
        const { data } = await api.delete(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function updateIssueSatate({ issueId, formData }: Pick<IssueAPI, 'issueId' | 'formData'>) {   
    try {
        const url = `/issues/${issueId}/state`
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}