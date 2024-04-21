import React, { useState } from 'react'
import axios from 'axios';

const SightingForm = (props) => {
    const {sightings, setSightings} = props;
    const [sdtype, setSdtype] = useState('');
    const [location, setLocation] = useState('');
    const [sightingdate, setSightingdate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [comments, setComments] = useState('')
    const [confirmMessage, setConfirmMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [errors, setErrors] = useState([])
    const [hideAdd, setHideAdd] = useState(true)

    //add new sighting
    const addNewSightingHandler = (e) => {
        e.preventDefault();

        if(hideAdd){
            setHideAdd(false);
        }else{
            axios.post('http://localhost:8000/api/newsighting', {sdtype,
                                                                location,
                                                                sightingdate,
                                                                quantity,
                                                                comments})
                .then(res => {setSightings([...sightings, res.data]);
                                setConfirmMessage(`${sdtype} has been added`);
                                setSdtype('');
                                setErrorMessage('');
                                setQuantity('');
                                setLocation('');
                                setSightingdate('');
                                setComments('');
                                setErrors([]);
                                setHideAdd(true);})
                .catch(err => {console.log('post to /api/newsighting error: ', err);
                                setErrors(err.response.data.errors);
                                document.getElementById('titleInput').focus();
                                setErrorMessage('Sighting not added due to the errors below:');
                                setConfirmMessage('');})
        }
    }

        return(
            <>   
            {hideAdd 
                ? <form onSubmit={addNewSightingHandler}>
                    <button class='lookLikeButton calligraffitti-regular'>Add Sighting</button>
                    <p className='confirmMessage  calligraffitti-regular'>{confirmMessage}</p>
                </form>
                : <form class='addForm' onSubmit={addNewSightingHandler}>
                    {/* main error message */}
                    <p id='errorMessage' className='errorMessage  calligraffitti-regular'>{errorMessage}</p>

                    {/* location */}
                    <input  type="text" 
                            placeholder='location'
                            id='location'  className='calligraffitti-regular'
                            onChange={(e) => setLocation(e.target.value)} 
                            value={location}
                            autoFocus />
                    {errors.location?<p className='errorMessage calligraffitti-regular'>{errors.location.message}</p>:null}
                    
                    {/* date */}
                    <input  type="text" 
                            placeholder='date (estimate ok)'  className='calligraffitti-regular'
                            onChange={(e) => setSightingdate(e.target.value)} 
                            value={sightingdate}/>
                    {errors.sightingdate?<p className='errorMessage calligraffitti-regular'>{errors.sightingdate.message}</p>:null}

                    {/* type of sanddollar */}
                    <input  type="text" 
                            placeholder='type (or "unknown")'
                            className='calligraffitti-regular'
                            onChange={(e) => setSdtype(e.target.value)} 
                            value={sdtype} />
                    {errors.sdtype?<p className='errorMessage calligraffitti-regular'>{errors.sdtype.message}</p>:null}
                    
                    {/* quantity sighted */}
                    <input  type="number" 
                            min="0" 
                            step=".01" 
                            placeholder='quantity'  className='calligraffitti-regular'
                            onChange={(e) => setQuantity(e.target.value)} 
                            value={quantity}/>
                    {errors.quantity?<p className='errorMessage calligraffitti-regular'>{errors.quantity.message}</p>:null}

                    {/* comments */}
                    <textarea rows='5' 
                            cols='19'  className='calligraffitti-regular'
                            onChange={e => setComments(e.target.value)}
                            placeholder='Comments (max 100 characters)'
                            value={comments}/>
                        {errors.comments?<p className='errorMessage calligraffitti-regular'>{errors.comments.message}</p>:null}
                    
                    {/* submit */}
                    <button className='addButton calligraffitti-regular'>Submit</button>
            </form>
            }
            </>
        )
}
export default SightingForm;