import './Card.css'
import React from "react";
import { Link } from "react-router-dom";

export function Card({background_image, name,genres,rating}){
    const genre= genres.map(el=>' '+el)
    

    return(
        <div className='tarjeta'>
            <h1 >{name}</h1>
           <center> <img src={background_image} width='300px'></img></center>
            <div className='adicionales'>
             <div className='genres'>GENRES: {genre.toString()}</div> 
             <div className='rating'>
            
            
             <div className='cal'>RATING<br/> {rating}</div>
             <img className='jake' src='https://thumbs.gfycat.com/PiercingVacantIchthyostega-size_restricted.gif' width='50px'></img>

             </div>
             </div>
        </div>

    )
}