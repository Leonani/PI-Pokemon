import React from "react";
import {Link} from 'react-router-dom';
import './CSS/landing.css'
import logo from './img/pokemonLogo.png'

export default function Landing() {
    return(
        <div className='wpLanding'>

            <Link className='btb' to = '/home'>

                <button class='btLanding'>
                    <div className='img'>

                        <img src={logo} alt="" />

                    </div>
                </button>

            </Link>

        </div>
    )
}