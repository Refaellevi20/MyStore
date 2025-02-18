import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'reviewsDB'

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
    let reviews = await storageService.query(STORAGE_KEY)
    if (filterBy.toyId) {
        reviews = reviews.filter(review => review.toyId === filterBy.toyId)
    }
    if (filterBy.userId) {
        reviews = reviews.filter(review => review.userId === filterBy.userId)
    }
    return reviews
}

async function getById(reviewId) {
    return await storageService.get(STORAGE_KEY, reviewId)
}

async function getByToyId(toyId) {
    const reviews = await query({ toyId })
    return reviews
}

async function remove(reviewId) {
    return await storageService.remove(STORAGE_KEY, reviewId)
}

async function save(review) {
    if (review._id) {
        return await storageService.put(STORAGE_KEY, review)
    } else {
        return await storageService.post(STORAGE_KEY, review)
    }
}

async function addReview(review) {
    review.createdAt = Date.now()
    return await storageService.post(STORAGE_KEY, review)
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

// Create demo reviews if none exist
;(async () => {
    const reviews = await query()
    if (!reviews || !reviews.length) {
        _createDemoReviews()
    }
})()

function _createDemoReviews() {
    const demoReviews = [
        {
            _id: 'r101',
            userId: 'u102',
            toyId: '622f337a75c7d36e498aaaf8',
            userName: 'John Doe',
            rating: 4.5,
            text: 'Great toy! My kids love it. The quality is excellent and it keeps them entertained for hours.',
            avatar: 'https://robohash.org/johndoe',
            createdAt: 1709654400000 // March 15, 2024
        },
        {
            _id: 'r102',
            userId: 'u103',
            toyId: '622f337a75c7d36e498aaaf8',
            userName: 'Sarah Smith',
            rating: 5,
            text: 'Absolutely fantastic! Worth every penny. The attention to detail is amazing.',
            avatar: 'https://robohash.org/sarahsmith',
            createdAt: 1709568000000 // March 14, 2024
        },
        {
            _id: 'r103',
            userId: 'u104',
            toyId: '622f337a75c7d36e498aaaf8',
            userName: 'Mike Johnson',
            rating: 4,
            text: 'Very good toy, but could use some improvements in durability. Otherwise, great purchase!',
            avatar: 'https://robohash.org/mikejohnson',
            createdAt: 1709481600000 // March 13, 2024
        }
    ]
    utilService.saveToStorage(STORAGE_KEY, demoReviews)
    return demoReviews
} 