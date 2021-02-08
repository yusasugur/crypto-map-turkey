import { Icon } from '@iconify/react'
import bitcoinIcon from '@iconify-icons/logos/bitcoin'

const LocationMarker = ({lat,lng,onClick}) => {
    return (
        
        <div className="location-marker" onClick={onClick} >
            <Icon icon={bitcoinIcon} className="location-icon"/>
        </div>
    )
}

export default LocationMarker
