// import React, { useState } from "react"
// import GoogleMapReact from 'google-map-react'
// import { FaMapPin } from "react-icons/fa6"
// import { LuMapPin } from "react-icons/lu"
// import { RiMapPinUserFill } from "react-icons/ri"
// import { SiMaplibre } from "react-icons/si"
// import { AiFillHome } from "react-icons/ai";
// import { FaMapMarkerAlt } from "react-icons/fa";



// const MyGoogleMap = ({ text }) => (
//     <div style={{ fontSize: '2em' }}>{text}</div>
// )

// const shopBranches = [
//     { id: 1, name: <div className="map-popper">
//         <FaMapMarkerAlt  />
//         <div className="popper-wedge"></div>
//     </div>, place: 'Tel Aviv', coords: { lat: 33.0114, lng: 34.7818 } },
//     { id: 2, name: <div className="map-popper">
//         <FaMapMarkerAlt  />
//         <div className="popper-wedge"></div>
//     </div>, place: "Nahariya", coords: { lat: 29.55805, lng: 35.0947 } },
//     { id: 3, name:<div className="map-popper">
//         <FaMapMarkerAlt  />
//         <div className="popper-wedge"></div>
//     </div>, place: 'Acko', coords: { lat: 30.6074, lng: 35.1882 } },
//     { id: 4, name: <div className="map-popper">
//         <FaMapMarkerAlt  />
//         <div className="popper-wedge"></div>
//     </div>, place: 'Beer Sheva', coords: { lat: 33.25297, lng: 34.79146 } }
// ];

// export function GoogeMap() {
//     const [selectedBranch, setSelectedBranch] = useState(null)
//     const [mapCenter, setMapCenter] = useState(shopBranches[0].coords)
//     const [zoom, setZoom] = useState(11)

//     const handleClick = (branch) => {
//         console.log('click!', branch)
//         setMapCenter(branch.coords)
//         setSelectedBranch(branch)
//         setZoom(12)
//     }

//     return (
//         <section>
//             <h2>About Us</h2>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
//             <section style={{ height: '50vh', width: '100%' }}>
//                 <GoogleMapReact
//                     bootstrapURLKeys={{ key: "AIzaSyC0M_ajvNygUWes9wqgZ0hRQy1pTsYGfmo" }}
//                     center={mapCenter}
//                     zoom={zoom}
//                     yesIWantToUseGoogleMapApiInternals
//                 >
//                     {shopBranches.map(branch => (
//                         <MyGoogleMap
//                             key={branch.id}
//                             lat={branch.coords.lat}
//                             lng={branch.coords.lng}  
//                             text={branch.name}
//                         />
//                     ))}
//                 </GoogleMapReact>
//             </section>
//             <div className="branch-buttons">
//                 {shopBranches.map(branch => (
//                     <button className="About-places" key={branch.id} onClick={() => handleClick(branch)}>
//                         {branch.name}
//                         <span className="tooltip-text">{branch.place}</span>
//                     </button>
//                 ))}
//             </div>
//         </section>
//     )
// }


//! key + style + feachers


import React, { useState, useEffect, useRef } from "react"
import GoogleMapReact from 'google-map-react'
import { FaMapMarkerAlt, FaDirections, FaSearch, FaMapMarked } from "react-icons/fa"
import { BiCurrentLocation } from "react-icons/bi"
import { MdTerrain, MdSatellite } from "react-icons/md"

const MyGoogleMap = ({ text, isSelected }) => (
    <div className={`map-marker ${isSelected ? 'selected' : ''}`}>
        {text}
        {isSelected && <div className="location-info">
            <h3>Branch Details</h3>
            <p>Open: 9:00 AM - 10:00 PM</p>
            <p>Phone: (123) 456-7890</p>
        </div>}
    </div>
)

const shopBranches = [
    { 
        id: 1, 
        name: <div className="map-popper">
            <FaMapMarkerAlt />
            <div className="popper-wedge"></div>
        </div>, 
        place: 'Tel Aviv', 
        coords: { lat: 33.0114, lng: 34.7818 },
        details: {
            address: "123 Main St, Tel Aviv",
            phone: "(123) 456-7890",
            hours: "9:00 AM - 10:00 PM",
            rating: 4.5
        }
    },
    { 
        id: 2, 
        name: <div className="map-popper">
            <FaMapMarkerAlt  />
            <div className="popper-wedge"></div>
        </div>, 
        place: "Nahariya", 
        coords: { lat: 39.55805, lng: 35.0947 },
        details: {
            address: "456 Beach Rd, Nahariya",
            phone: "(123) 456-7891",
            hours: "9:00 AM - 10:00 PM",
            rating: 4.3
        }
    },
    { 
        id: 3, 
        name: <div className="map-popper">
            <FaMapMarkerAlt  />
            <div className="popper-wedge"></div>
        </div>, 
        place: 'Acko', 
        coords: { lat: 30.6074, lng: 15.1882 },
        details: {
            address: "789 Port Ave, Acko",
            phone: "(123) 456-7892",
            hours: "9:00 AM - 10:00 PM",
            rating: 4.4
        }
    },
    { 
        id: 4, 
        name: <div className="map-popper">
            <FaMapMarkerAlt  />
            <div className="popper-wedge"></div>
        </div>, 
        place: 'Beer Sheva', 
        coords: { lat: 23.25297, lng: 34.79146 },
        details: {
            address: "321 Desert St, Beer Sheva",
            phone: "(123) 456-7893",
            hours: "9:00 AM - 10:00 PM",
            rating: 4.6
        }
    }
];

export function GoogeMap() {
    const [selectedBranch, setSelectedBranch] = useState(null)
    const [mapCenter, setMapCenter] = useState(shopBranches[0].coords)
    const [zoom, setZoom] = useState(8)
    const [mapType, setMapType] = useState('roadmap')
    const [userLocation, setUserLocation] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredBranches, setFilteredBranches] = useState(shopBranches)
    const branchDetailsRef = useRef(null)

    useEffect(() => {
        // Filter branches based on search query
        const filtered = shopBranches.filter(branch => 
            branch.place.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredBranches(filtered)
    }, [searchQuery])

    useEffect(() => {
        function handleClickOutside(event) {
            if (branchDetailsRef.current && !branchDetailsRef.current.contains(event.target)) {
                setSelectedBranch(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClick = (branch) => {
        setMapCenter(branch.coords)
        setSelectedBranch(branch)
        setZoom(8)
    }

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    setUserLocation(location)
                    setMapCenter(location)
                    setZoom(14)
                },
                (error) => {
                    console.error("Error getting location:", error)
                    alert("Unable to retrieve your location")
                }
            )
        } else {
            alert("Geolocation is not supported by your browser")
        }
    }

    const getDirections = (branch) => {
        if (!userLocation) {
            // First try to get the user's location
            getCurrentLocation();
            // Only show alert if geolocation is not supported
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser");
            }
            return;
        }
        
        // If we have the user location, open directions in Google Maps
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${branch.coords.lat},${branch.coords.lng}`;
        window.open(url, '_blank');
    };

    return (
        <section className="map-container">
            <h2>Our Locations</h2>
            <p>Find our branches across the country</p>

            <div className="map-controls">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input 
                        type="text"
                        placeholder="Search locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="map-buttons">
                    <button onClick={getCurrentLocation} className="location-btn">
                        <BiCurrentLocation /> My Location
                    </button>
                    <button 
                        onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')} 
                        className="map-type-btn"
                    >
                        {mapType === 'roadmap' ? <MdSatellite /> : <MdTerrain />}
                        {mapType === 'roadmap' ? 'Satellite' : 'Map'} View
                    </button>
                </div>
            </div>

            <section className="map-section">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyC0M_ajvNygUWes9wqgZ0hRQy1pTsYGfmo" }}
                    center={mapCenter}
                    zoom={zoom}
                    options={{
                        mapTypeId: mapType,
                        fullscreenControl: true,
                        zoomControl: true,
                        styles: [
                            {
                                featureType: "all",
                                elementType: "labels.text.fill",
                                stylers: [{ color: "#7c93a3" }]
                            }
                            // Add more custom styles as needed
                        ]
                    }}
                >
                    {filteredBranches.map(branch => (
                        <MyGoogleMap
                            key={branch.id}
                            lat={branch.coords.lat}
                            lng={branch.coords.lng}
                            text={branch.name}
                            isSelected={selectedBranch?.id === branch.id}
                        />
                    ))}
                    {userLocation && (
                        <div
                            lat={userLocation.lat}
                            lng={userLocation.lng}
                            className="user-location-marker"
                        >
                            <BiCurrentLocation />
                        </div>
                    )}
                </GoogleMapReact>
            </section>

            <div className="branch-buttons">
                {filteredBranches.map(branch => (
                    <div className="branch-card" key={branch.id}>
                        <button 
                            className={`About-places ${selectedBranch?.id === branch.id ? 'selected' : ''}`} 
                            onClick={() => handleClick(branch)}
                        >
                            {branch.name}
                            <span className="tooltip-text">{branch.place}</span>
                        </button>
                        {/* {selectedBranch?.id === branch.id && (
                            <div className="branch-details" ref={branchDetailsRef}>
                                <p><strong>Address:</strong> {branch.details.address}</p>
                                <p><strong>Hours:</strong> {branch.details.hours}</p>
                                <p><strong>Phone:</strong> {branch.details.phone}</p>
                                <button 
                                    className="directions-btn"
                                    onClick={() => getDirections(branch)}
                                >
                                    <FaDirections /> Get Directions
                                </button>
                            </div>
                        )} */}
                    </div>
                ))}
            </div>
        </section>
    )
}


//! key + style + feachers