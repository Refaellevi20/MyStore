import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'reviewsDB'
const BASE_URL = 'review/'

export const reviewService = {
    query,
    getById,
    save,
    remove,
    getEmptyReview,
    addReview,
    getByToyId
}

async function query(filterBy = {}) {
    try {
        return await httpService.get(BASE_URL, filterBy)
    } catch (err) {
        console.error('Failed to get reviews:', err)
        throw err
    }
}

async function getById(reviewId) {
    try {
        return await httpService.get(BASE_URL + reviewId)
    } catch (err) {
        console.error(`Failed to get review ${reviewId}:`, err)
        throw err
    }
}

async function getByToyId(toyId) {
    try {
        return await httpService.get(BASE_URL + 'toy/' + toyId)
    } catch (err) {
        console.error(`Failed to get reviews for toy ${toyId}:`, err)
        throw err
    }
}

async function remove(reviewId) {
    try {
        return await httpService.delete(BASE_URL + reviewId)
    } catch (err) {
        console.error(`Failed to remove review ${reviewId}:`, err)
        throw err
    }
}

async function save(review) {
    try {
        if (review._id) {
            return await httpService.put(BASE_URL + review._id, review)
        } else {
            return await httpService.post(BASE_URL, review)
        }
    } catch (err) {
        console.error('Failed to save review:', err)
        throw err
    }
}

async function addReview(review) {
    try {
        const user = await userService.getLoggedinUser()
        review.userId = user._id
        review.userName = user.fullname
        review.avatar = user.imgUrl || 'https://robohash.org/' + user._id
        review.createdAt = Date.now()
        
        return await httpService.post(BASE_URL, review)
    } catch (err) {
        console.error('Failed to add review:', err)
        throw err
    }
}

function getEmptyReview() {
    return {
        userId: '',
        toyId: '',
        userName: '',
        rating: 5,
        text: '',
        avatar: 'https://robohash.org/guest',
        createdAt: null
    }
} 