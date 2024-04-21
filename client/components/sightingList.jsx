import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SightingList = (props) => {
    const {sightings, setSightings } = props;
    const navigate = useNavigate();

    //get all sightings from database
    useEffect(() => {
        axios.get("http://localhost:8000/api/allSightings")
            .then((res) => {
                setSightings(res.data);
            })
            .catch((err) => {
                console.log('get all sightings error: ', err);
            })
    }, [])

    //delete sighting
    const deleteSighting = (id, location) => {
        axios.delete('http://localhost:8000/api/oneSightingById/' + id)
            .then(res => {
                console.log(`The sighting at ${location} was deleted`);
                navigate('/home');
                setSightings(sightings.filter(sighting => id!=sighting._id))
            })
            .catch(err => console.log('deleteSighting err: ', err))
    }

    return (
        <>
            <h1 id='listTitle' className='calligraffitti-regular'>Sightings</h1>
            {/* list all sightings in alphabetical order by location */}
            {sightings.sort((sighting1, sighting2) => (sighting1.location.toLowerCase() < sighting2.location.toLowerCase() 
                            ? -1 
                            : ((sighting1.location.toLowerCase() > sighting2.location.toLowerCase()) ? 1 : 0))).map((sighting) => {
                return (
                    <div key={sighting._id} className='oneSighting calligraffitti-regular'>
                        <p className='sdtype'>{sighting.sdtype}</p>
                        <Link to={`/sightingDetail/${sighting._id}`} className='lookLikeButton'>Details</Link>
                        <button   className='calligraffitti-regular' onClick={(e) => deleteSighting(sighting._id, sighting.sdtype)}>Delete</button>
                    </div>
                )
            })}
        </>
    );
}
export default SightingList;