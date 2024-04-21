import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();

    return(
        <section id='welcomeScreen' className='calligraffitti-regular'>
            <p>Welcome to</p>
            <h1 id='welcomeTitle'>Sand Dollar Sightings</h1>
            <Link to='/home'>Enter</Link>
        </section>
    )
}
export default Welcome;