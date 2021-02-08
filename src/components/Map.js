import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'
import useGeolocation from 'react-hook-geolocation'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Toast from 'react-bootstrap/Toast'
import { Icon } from '@iconify/react';
import locationIcon from '@iconify-icons/akar-icons/location';
import mapIcon from '@iconify-icons/bi/map';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'


const Map = ({ venueData }) => {
    const mapKey=process.env.REACT_APP_MAP_API
    const googleKey=process.env.REACT_APP_GOOGLE_API
    const [locationInfo, SetLocationInfo] = useState('')
    const [center, setCenter] = useState({ lat: 39.925533, lng: 32.866287 })
    const [zoom, setZoom] = useState(6)
    const geolocation = useGeolocation()
    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);
    const [city,setCity]=useState('')

    const markers = venueData.map(ven => {
        return <LocationMarker key={ven.id}
            lat={ven.lat}
            lng={ven.lon}
            onClick={() => sendRequest(ven.id)} />
    })



    const sendRequest =
        async (ven) => {
            const res = await fetch(`https://coinmap.org/api/v1/venues/${ven}`)

            const { venue } = await res.json()

            SetLocationInfo(venue)

        }

    const findLocation = (e) => {

        e.preventDefault()

        if (!geolocation.error) {
            setCenter({ lat: geolocation.latitude, lng: geolocation.longitude })
            setZoom(10)

        } else {
            toggleShowA()
        }
    }

    const overAllView = (e) => {
        e.preventDefault()
        setCenter({ lat: 39.925533, lng: 32.866287 })
        setZoom(6)
    }


        const onSubmit = async(e)=>{
            e.preventDefault()
            var q=encodeURIComponent(city)
            const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${mapKey}&q=${q}`)
    
            const {results} = await res.json()
            if(results[0].components.country === "Turkey")
            {  
            setCenter(results[0].geometry)
            setZoom(10)
            setCity('')}
        }
    
    
    return (
        <div className="map">

            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                <Nav.Link href="#">
                <Button variant="light" onClick={findLocation}><Icon className="locIcon" icon={locationIcon} />Get My Location</Button>
                </Nav.Link>
                <Nav.Link href="#">
                <Button variant="light" onClick={overAllView}> <Icon className="locIcon" icon={mapIcon} />Overall View</Button>
                </Nav.Link>
                </Nav>

                <Form onSubmit={onSubmit} inline>
                    <FormControl 
                    type="text" 
                    placeholder="Search City" 
                    className="mr-sm-2"
                    onChange={e => setCity(e.target.value)}
                    type="text"
                    value={city}
                     />
                    <Button variant="outline-info" type="submit">Search</Button>
                </Form>
            </Navbar>



            <GoogleMapReact
                bootstrapURLKeys={{ key: googleKey }}
                defaultCenter={center}
                defaultZoom={zoom}
                center={center}
                zoom={zoom}

            >


                {markers}
                {locationInfo && (<LocationInfoBox
                    lat={locationInfo.lat}
                    lng={locationInfo.lon}
                    info={locationInfo}
                ></LocationInfoBox>)}

            </GoogleMapReact>

            <div className="getLocationInfo">
                <Toast
                    style={{
                        position: 'sticky',
                    }}
                    show={showA} onClose={toggleShowA} autohide>
                    <Toast.Body>Cannot get your location data</Toast.Body>
                </Toast>
            </div>

        </div>
    )
}

export default Map
