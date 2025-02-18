import React, { useState } from "react"
import GoogleMapReact from 'google-map-react'
import { FaMapPin } from "react-icons/fa6"
import { LuMapPin } from "react-icons/lu"
import { RiMapPinUserFill } from "react-icons/ri"
import { SiMaplibre } from "react-icons/si"
import { AiFillHome } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";



const MyGoogleMap = ({ text }) => (
    <div style={{ fontSize: '2em' }}>{text}</div>
)

const shopBranches = [
    { id: 1, name: <div className="map-popper">
        <FaMapMarkerAlt  />
        <div className="popper-wedge"></div>
    </div>, place: 'Tel Aviv', coords: { lat: 33.0114, lng: 34.7818 } },
    { id: 2, name: <div className="map-popper">
        <FaMapMarkerAlt  />
        <div className="popper-wedge"></div>
    </div>, place: "Nahariya", coords: { lat: 29.55805, lng: 35.0947 } },
    { id: 3, name:<div className="map-popper">
        <FaMapMarkerAlt  />
        <div className="popper-wedge"></div>
    </div>, place: 'Acko', coords: { lat: 30.6074, lng: 35.1882 } },
    { id: 4, name: <div className="map-popper">
        <FaMapMarkerAlt  />
        <div className="popper-wedge"></div>
    </div>, place: 'Beer Sheva', coords: { lat: 33.25297, lng: 34.79146 } }
];

export function GoogeMap() {
    const [selectedBranch, setSelectedBranch] = useState(null)
    const [mapCenter, setMapCenter] = useState(shopBranches[0].coords)
    const [zoom, setZoom] = useState(11)

    const handleClick = (branch) => {
        console.log('click!', branch)
        setMapCenter(branch.coords)
        setSelectedBranch(branch)
        setZoom(12)
    }

    return (
        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <section style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyC0M_ajvNygUWes9wqgZ0hRQy1pTsYGfmo" }}
                    center={mapCenter}
                    zoom={zoom}
                    yesIWantToUseGoogleMapApiInternals
                >
                    {shopBranches.map(branch => (
                        <MyGoogleMap
                            key={branch.id}
                            lat={branch.coords.lat}
                            lng={branch.coords.lng}  
                            text={branch.name}
                        />
                    ))}
                </GoogleMapReact>
            </section>
            <div className="branch-buttons">
                {shopBranches.map(branch => (
                    <button className="About-places" key={branch.id} onClick={() => handleClick(branch)}>
                        {branch.name}
                        <span className="tooltip-text">{branch.place}</span>
                    </button>
                ))}
            </div>
        </section>
    )
}
