import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/navbar.css'

import logo from './img/logo.png'
import logoPoke from './img/pokemonLogo.png'

export default function NavBar() {


    return (
        <div className='conteinerNav'>            
            <div className="nav">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>    
                <div className='title'>
                        <img src={logoPoke} alt="logo pokemon" />
                </div>
                <div className='botoncitos'>
                    <ul>
                        <Link to='/'><li><button className='bth'>Landing</button></li></Link>    
                        {/* <Link to='/home'><li><button className='bth'>Home</button></li></Link>
                        <Link to= '/create'><li><button className='btc'>Add Pokemon</button></li></Link> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}