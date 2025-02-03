import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const orderService = {
  query,
  getById,
  remove,
  save,
  getEmptyOrder,
}

const STORAGE_KEY = 'orders'

_createOrders()

async function query(filterBy = {}) {
  let orders = await storageService.query(STORAGE_KEY)
  if (filterBy.hostId) {
    orders = orders.filter((order) => order.hostId === filterBy.hostId)
  }
  if (filterBy.buyerId) {
    orders = orders.filter((order) => order.buyer._id === filterBy.buyerId)
  }
  return orders
}

async function getById(orderId) {
  const order = await storageService.get(STORAGE_KEY, orderId)
  return order
}

async function remove(orderId) {
  return storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
  if (order._id) {
    return storageService.put(STORAGE_KEY, order)
  } else {
    return storageService.post(STORAGE_KEY, order)
  }
}

function getEmptyOrder() {
  return {
    _id: '',
    createdAt: new Date(),
    buyer: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    totalPrice: 0,
    toy: {
      _id: '',
      name: '',
      price: 0,
      imgUrl: '',
    },
    status: 'pending',
    paymentDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    }
  }
}

function _createdDemoOrders() {
  let DEMO_ORDERS = [
    {
      _id: 'o1225',
      createdAt: '2024-03-15T10:30:00',
      buyer: {
        _id: 'u102',
        fullname: 'John Doe',
        imgUrl: 'https://robohash.org/johndoe',
      },
      totalPrice: 89.99,
      toy: {
        _id: 't102',
        name: 'Remote Control Car',
        price: 89.99,
        imgUrl: 'https://example.com/rc-car.jpg',
      },
      status: 'pending',
      paymentDetails: {
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
      }
    },
    {
      _id: 'o1226',
      createdAt: '2024-03-14T15:45:00',
      buyer: {
        _id: 'u103',
        fullname: 'Jane Smith',
        imgUrl: 'https://robohash.org/janesmith',
      },
      totalPrice: 34.99,
      toy: {
        _id: 't103',
        name: 'LEGO Set',
        price: 34.99,
        imgUrl: 'https://example.com/lego-set.jpg',
      },
      status: 'completed',
      paymentDetails: {
        cardNumber: '**** **** **** 5555',
        expiryDate: '09/24',
      }
    },
    {
      _id: 'o1227',
      createdAt: '2024-03-13T09:15:00',
      buyer: {
        _id: 'u104',
        fullname: 'Mike Johnson',
        imgUrl: 'https://robohash.org/mikejohnson',
      },
      totalPrice: 129.99,
      toy: {
        _id: 't104',
        name: 'Drone',
        price: 129.99,
        imgUrl: 'https://example.com/drone.jpg',
      },
      status: 'processing',
      paymentDetails: {
        cardNumber: '**** **** **** 8888',
        expiryDate: '03/25',
      }
    }
  ]
  
  utilService.saveToStorage(STORAGE_KEY, JSON.parse(JSON.stringify(DEMO_ORDERS)))
}

function _createOrders() {
  let orders = utilService.loadFromStorage(STORAGE_KEY)
  if (!orders || !orders.length) {
    _createdDemoOrders()
  }
}