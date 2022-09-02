import './LandingPage.css'
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){

    return(
        <div className='Lcont' >
        <p className='pacman1'> .<br/>.</p>  
        <div className='texto'>
        
        <h2>Bienvenido</h2>
        <h1 className='app'>APP DE VIDEOJUEGOS</h1>
        <p className='des'>Podrás encontrar cientos de videojuegos de diferentes géneros e incluso agregar juegos nuevos</p>
        </div>
        <p className='pacman'> .<br/>.</p>
        

        <Link to='/home' >
                <center><button className='tohome'><h1 className='HOMEBUT'>GO HOME</h1></button></center>
            </Link>
        </div>
    )
}