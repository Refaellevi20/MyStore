import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'supportDB'

export const supportService = {
    submitSupportRequest,
    getRequests,
    getById,
    updateRequest
}

async function submitSupportRequest(request) {
    request.id = utilService.makeId()
    request.status = 'pending'
    request.createdAt = Date.now()
    return await storageService.post(STORAGE_KEY, request)
}

async function getRequests() {
    return await storageService.query(STORAGE_KEY)
}

async function getById(requestId) {
    return await storageService.get(STORAGE_KEY, requestId)
}

async function updateRequest(request) {
    return await storageService.put(STORAGE_KEY, request)
} 