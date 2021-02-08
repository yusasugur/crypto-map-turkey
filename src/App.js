import { useState, useEffect } from 'react'
import Map from './components/Map'

function App() {
  const [venueData,setVenueData] = useState([])


  useEffect(()=>{
    const fetchEvents = async () => {
    const res = await fetch('https://coinmap.org/api/v1/venues/?lat1=35.9025&lat2=42.02683&lon1=25.90902&lon2=44.5742')
    
    const {venues} =await res.json()

    setVenueData(venues)

    }
    fetchEvents()
  },[])



  return (
    <div>
      {<Map venueData={venueData} />}
    </div>
  );
}

export default App;
