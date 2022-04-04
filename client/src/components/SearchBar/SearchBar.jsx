import './SearchBar.css'
import React from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getGame} from "../../actions";

export default function SearchBar(){
    const[game, setGame]= useState('')

    const dispatch = useDispatch();

    function handleChange(e){
        e.preventDefault();
        setGame(e.target.value)
        
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getGame(game))
        
        
        setGame('')
    }

    return(
        <div className='busqueda'>
            <input className="buscar" type='text' placeholder="buscar juego" onChange={(e)=>handleChange(e) } value={game}></input>
            <button className='busca' type="submit" onClick={(e)=>handleSubmit(e)} >Buscar</button>
        </div>
    )

}