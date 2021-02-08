import 'bootstrap/dist/css/bootstrap.min.css';

const LocationInfoBox = ({lat,lng,info}) => {

    return (
    
        <div>
        <div className="infoBox"  >
            <h6>{info.name}</h6>
            <h6> <a href={info.website}>{info.website}</a></h6>
            <h6> <a href={"mailto:"+info.email} >{info.email}</a> </h6>
            <h6>{info.phone}</h6>
        </div>
        </div>
    )
}

export default LocationInfoBox
