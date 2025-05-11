import { httpService } from './http.service'

const BASE_URL = 'support/'

export const supportService = {
    submitSupportRequest,
    getRequests,
    getById,
    updateRequest
}

async function submitSupportRequest(request) {
    return await httpService.post(BASE_URL, request)
}

async function getRequests() {
    return await httpService.get(BASE_URL)
}

async function getById(requestId) {
    return await httpService.get(`${BASE_URL}${requestId}`)
}

async function updateRequest(request) {
    return await httpService.put(`${BASE_URL}${request._id}`, request)
} 