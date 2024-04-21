import React, { useState } from 'react';
import SightingForm from '../components/sightingForm.jsx';
import SightingList from '../components/sightingList.jsx';

const Home = (props) => {
    const [sightings, setSightings] = useState([]);

    return (
        <div>
            <SightingForm sightings={sightings} setSightings={setSightings}/>
            <SightingList sightings={sightings} setSightings={setSightings} />
        </div>
    )
}
export default Home;