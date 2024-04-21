import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";

const SightingDetail = (props) => {
    const { id } = useParams();
    const [sighting, setSighting] = useState([])
    const navigate = useNavigate();

    //get details for one sighting
    useEffect(() => {
        axios.get("http://localhost:8000/api/oneSightingById/" + id)
            .then(res => {
                console.log('get sighting detail res.data = ', res.data);
                setSighting(res.data);
            })
            .catch(err => console.log('get sighting detail error: ', err));
    }, []);

    //delete one sightings, then return home
    const deleteSighting = (id, location) => {
        axios.delete('http://localhost:8000/api/oneSightingById/' + id)
            .then(res => {
                console.log(`The sighting at ${location} was deleted`);
                navigate('/home');
            })
            .catch(err => console.log('deleteSighting err: ', err))
    }

    return (
        <section id='sightingDetail'   className='calligraffitti-regular' >
            <p className='sightingDetail'>{sighting.quantity} {sighting.sdtype} sighted</p>
            <p className='sightingDetail'>at {sighting.location}</p>
            <p className='sightingDetail'>on {sighting.sightingdate}</p>
            <br/>
            <p id='description' className='sightingDetail'>{sighting.comments}</p>
            <div id='detailButtons'>
                <Link to={'/home'} className='lookLikeButton'>Back to List</Link>
                <Link to={`/sighting/edit/${id}`} className='lookLikeButton'>Edit</Link>
                <button   className='calligraffitti-regular' onClick={(e) => deleteSighting(sighting._id, sighting.sdtype)}>Delete</button>
            </div>
            
        </section>
    );
}
export default SightingDetail;