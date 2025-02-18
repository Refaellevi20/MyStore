import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
  query,
  getAlltoys,
  getById,
  save,
  remove,
  getEmptytoy,
  getAmenitiesList,
}

_createtoys()

async function query(filterBy) {
  let toys = await storageService.query(STORAGE_KEY)

  if (filterBy.category) {
    toys = toys.filter((toy) => {
      return toy.labels.includes(filterBy.category)
    })
  }
  if (filterBy.location) {
    toys = toys.filter((toy) => {
      return toy.loc.country
        .toLowerCase()
        .includes(filterBy.location.toLowerCase())
    })
  }
  return toys
}

async function getAlltoys() {
  const toys = await storageService.query(STORAGE_KEY)
  return toys
}

async function getById(toyId) {
  const toy = await storageService.get(STORAGE_KEY, toyId)
  return toy
}

async function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    return storageService.post(STORAGE_KEY, toy)
  }
}

async function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function getAmenitiesList() {
  return [
    'Air conditioning',
    'Balcony',
    'Beachfront',
    'Bed linens',
    'Blender',
    'Board Games',
    'Body soap',
    'Building staff',
    'Carbon monoxide detector',
    'City skyline view',
    'Cleaning products',
    'Coffee maker',
    'Cooking basics',
    'Crib',
    'Dining table',
    'Dishes and silverware',
    'Dishwasher',
    'Doorman',
    'Dryer',
    'Elevator',
    'Essentials',
    'Ethernet connection',
    'Extra pillows and blankets',
    'Fire extinguisher',
    'Fire pit',
    'First aid kit',
    'Free parking on premises',
    'Free street parking',
    'Gym',
    'Hair dryer',
    'Hangers',
    'Heating',
    'High Chair',
    'Host greets you',
    'Hot tub',
    'Hot water',
    'Hot water kettle',
    'Iron',
    'Kitchen',
    'Laptop friendly workspace',
    'Lockbox',
    'Long term toys allowed',
    'Microwave',
    'Mountain view',
    'Oven',
    'Paid parking off premises',
    'Paid parking on premises',
    'Park view',
    'Parking',
    'Patio or balcony',
    'Pets allowed',
    'Pool',
    'Private entrance',
    'Refrigerator',
    'Room-darkening shades',
    'Safe',
    'Security cameras',
    'Self check-in',
    'Shampoo',
    'Single level home',
    'Smoke detector',
    'Smoking allowed',
    'Step-free access',
    'Stove',
    'Suitable for events',
    'Toaster',
    'TV',
    'Valley view',
    'Wardrobe',
    'Washer',
    'Waterfront',
    'Wifi',
  ]
}
function getEmptytoy() {
  return {
    _id: '',
    name: 'Magical Place',
    type: 'Entire home/apt',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg',
    ],
    price: 100,
    summary: 'An imaginary place far far away',
    capacity: '',
    amenities: [],
    labels: [''],
    host: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    loc: {
      country: 'Canada',
      countryCode: 'CA',
      city: 'Montreal',
      address: 'Montréal, QC, Canada',
      lat: -73.54985,
      lng: 45.52797,
    },
    reviews: [],
    likedByUsers: [],
  }
}

//PVT
function _createDemotoys() {
  const DEMO_toyS = [
    {
      _id: '622f337a75c7d36e498aaaf8',
      name: "Moshe's house",
      type: 'Entire home/apt',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg',
      ],
      price: '82',
      summary:
        'Moshe\'s house, toys under 7 night $38/res - Inquire about availability, I review then offer/approve if available :) - READ "The Space" for cleaning/etc AND brief explanation about timeshare reservations - Want guaranteed view for additional cost? Must be weekly rental, other restrictions - Wheelchair accessible / ADA, call resort directly to ensure U receive. If U need ADA U MUST inform us BEFORE booking.',
      capacity: '5',
      amenities: [
        'TV',
        'Wifi',
        'Air conditioning',
        'Wheelchair accessible',
        'Pool',

    
        'Beachfront',
      ],
      labels: ['national-parks'],
      host: {
        _id: 'u101',
        fullname: 'Muki Host',
        imgUrl: 'https://robohash.org/mukihost',
      },
      loc: {
        country: 'Portugal',
        countryCode: 'US',
        city: 'Porto',
        address: 'Porto, Portugal',
        lat: -156.6917,
        lng: 20.93792,
      },
      reviews: [
        {
          id: 'r1',
          userId: 'u102',
          userName: 'John Doe',
          rating: 4.5,
          text: 'Great toy! My kids love it. The quality is excellent and it keeps them entertained for hours.',
          date: '2024-03-15',
          avatar: 'https://robohash.org/johndoe'
        },
        {
          id: 'r2',
          userId: 'u103',
          userName: 'Sarah Smith',
          rating: 5,
          text: 'Absolutely fantastic! Worth every penny. The attention to detail is amazing.',
          date: '2024-03-14',
          avatar: 'https://robohash.org/sarahsmith'
        },
        {
          id: 'r3',
          userId: 'u104',
          userName: 'Mike Johnson',
          rating: 4,
          text: 'Very good toy, but could use some improvements in durability. Otherwise, great purchase!',
          date: '2024-03-13',
          avatar: 'https://robohash.org/mikejohnson'
        }
      ],
      likedByUsers: [],
    },
    {
      _id: '622f337a75c7d36e498aaaf9',
      name: 'Belle chambre à côté Metro Papineau',
      type: 'Private room',
      imgUrls: [
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg',
        'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg',
      ],
      price: 30,
      summary:
        "Chambre dans un bel appartement moderne avec balcon, ascenseur et terrasse. Private room in a beautiful modern apartment  with balcony, elevator and patio. La chambre est fermée avec une lit double. Vous aurez accès à une salle de bain avec une douche, terrasse. L'appartement est climatisé.  Votre chambre est équipé d'une connexion Wi-Fi illimité. Vous serez proche du centre ville, au pied du pont Jacques Cartier et à distance de marche de toutes les commodités (métro, supermarché, pharmacie",
      capacity: 2,
      amenities: [
        'TV',
        'Wifi',
        'Air conditioning',
        'Kitchen',
        'Elevator',
        'Heating',
        'Washer',
        'Dryer',
        'Smoke detector',
        'Carbon monoxide detector',
        'Essentials',
        'Iron',
      ],
      labels: ['campers', 'trending'],
      host: {
        _id: 'u101',
        fullname: 'Muki Host',
        imgUrl: 'https://robohash.org/mukihost',
      },
      loc: {
        country: 'Canada',
        countryCode: 'CA',
        city: 'Montreal',
        address: 'Montréal, QC, Canada',
        lat: -73.54985,
        lng: 45.52797,
      },
      reviews: [],
      likedByUsers: [],
    },
  ]
  utilService.saveToStorage(STORAGE_KEY, JSON.parse(JSON.stringify(DEMO_toyS)))
}

function _createtoys() {
  let toysDB = utilService.loadFromStorage(STORAGE_KEY)
  if (!toysDB || !toysDB.length) {
    _createDemotoys()
  }
}
