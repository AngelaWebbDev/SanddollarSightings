import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateSighting = (props) => {

    const { id } = useParams();
    const [sdtype, setSdtype] = useState('');
    const [location, setLocation] = useState('');
    const [sightingdate, setSightingdate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [comments, setComments] = useState('');
    const navigate = useNavigate('');
    const [errors, setErrors] = useState([])

    // retrieve the current values for this person to get prefilled values for form
    useEffect(() => {
        axios.get('http://localhost:8000/api/oneSightingById/' + id)
            .then(res => {
                setSdtype(res.data.sdtype);
                setLocation(res.data.location);
                setSightingdate(res.data.sightingdate);
                setQuantity(res.data.quantity);
                setComments(res.data.comments);
            })
            .catch(err => console.log('get sighting detail in update err: ', err))
    }, [])

    // update a sighting
    const updateSighting = (e) => {
        e.preventDefault();

        axios.put('http://localhost:8000/api/edit/' + id, {
            sdtype,
            location,
            sightingdate,
            quantity,
            comments
        })
            .then(res => {
                console.log('update completed: ', res);
                navigate("/home");
            })
            .catch(err => {
                console.log('put err: ', err);
                setErrors(err.response.data.errors)
            })
    }

    return (
        <section id='updateSighting'  className='calligraffitti-regular' >
            {/* title of page */}
            <h1 className='sightingDetail'>Edit Sighting Details</h1>

            {/* update form */}
            <form onSubmit={updateSighting}>
                {/* location */}
                <input className='sightingDetail calligraffitti-regular' 
                        type="text"
                        value={location}
                        onChange={(e) => { setLocation(e.target.value) }} />
                {errors.location ? <p className='errorMessage calligraffitti-regular'>{errors.location.message}</p> : null}<br />

                {/* sand dollar type */}
                <input className='sightingDetail calligraffitti-regular' 
                        type="text"
                        value={sdtype}
                        onChange={(e) => { setSdtype(e.target.value) }} />
                {errors.sdtype ? <p className='errorMessage calligraffitti-regular'>{errors.sdtype.message}</p> : null}<br />
                
                {/* date */}
                <input className='sightingDetail calligraffitti-regular' 
                        type="text"
                        value={sightingdate}
                        onChange={(e) => { setSightingdate(e.target.value) }} />
                {errors.sightingdate ? <p className='errorMessage calligraffitti-regular'>{errors.sightingdate.message}</p> : null}<br />

                {/* quantity */}
                <input className='sightingDetail calligraffitti-regular' 
                        type="number" 
                        min="1" 
                        step="1"
                        value={quantity}
                        onChange={(e) => { setQuantity(e.target.value) }} />
                {errors.quantity ? <p className='errorMessage calligraffitti-regular'>{errors.quantity.message}</p> : null}<br />

                {/* description */}
                <textarea rows='5'
                        cols='20'
                        className='sightingDetail   calligraffitti-regular' 
                        type="text"
                        value={comments}
                        onChange={(e) => { setComments(e.target.value) }} />
                {errors.comments ? <p className='errorMessage calligraffitti-regular'>{errors.comments.message}</p> : null}<br />
                
                {/* buttons: home, details, cancel */}
                <div id='detailButtons'>
                    <Link to={'/home'} className='lookLikeButton'>Home</Link>
                    <Link to={`/sightingDetail/${id}`} className='lookLikeButton'>Details</Link>
                    <button  className='calligraffitti-regular' >Submit</button>
                    <Link to={`/sightingDetail/${id}`} className='lookLikeButton'>Cancel</Link>
                </div>
            </form>
        </section>
    )
}
export default UpdateSighting;