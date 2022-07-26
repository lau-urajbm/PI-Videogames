import './Creation.css' 
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getGenres, getPlatforms, postNewGame, } from "../../actions";
import { Link, Navigate, useNavigate} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export  function validate(input){
    let errors = {}
    //validador de juego
if(!input.name){
  errors.name = 'El nombre del juego es requerido';
}else if(/[0-9-]+$/.test(input.name)){
  errors.name = 'el nombre del juego no es válido';
}
//validador de descripcion
if(!input.description){
  errors.description = 'La descripción es requerida'
}else if(/[0-9-]+$/.test(input.description)){
  errors.description = 'La descripción no pueden ser solo números'
}
//validador de fecha
if(!input.released){
errors.released = 'la fecha de lanzamiento es requerida'
}else if(!/[0-9-]+$/.test(input.released)){
errors.released = 'La fecha de lanzamiento se debe escribir siguiendo el modelo: 2013-09-17'
}

//validador de rating
if(!input.rating){
errors.rating = 'El rating es requerido'
}else if(!/[0-9-]+$/.test(input.rating )){
errors.rating = 'El rating debe ser un número'
}

if(!input.genres){
    errors.genres = 'Es requerido por lo menos un Género'
    }


return errors;

}

export default function Creation(){
    const genres = useSelector(state=>state.genres)
    const platforms=useSelector(state=>state.platforms)
    
    const navigate = useNavigate()

    const dispatch = useDispatch()
    useEffect(()=>{
        if(genres.length ===0 || platforms.length===0){
            dispatch(getGenres())
            dispatch(getPlatforms())
        }
    },[])

    const[errors, setErrors]=useState({})
    const[input, setInput] =  useState({
        name:'',
        description: '', 
        released:'', 
        rating:'', 
        genres:[], 
        platforms:[], 
        background_image:''
    })

    function handleInputChange(e){
        e.preventDefault()

        setInput({
            ...input,
            [e.target.name]:e.target.value
         } )
         setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
          }));
    }

    function handleGenres(e){
        e.preventDefault()

        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
         } )
         

         
    }
    function handlePlatforms(e){
        e.preventDefault()

        setInput({
            ...input,
            platforms: [...input.platforms,e.target.value]
         } )
    }

    function hanldeSubmit(e){
        e.preventDefault()
        if(errors.name||errors.rating||errors.released||errors.genres||errors.description){
            alert('asegurate de rellenar todos los campos necesarios y cumplir todos los requerimientos')
        }else{
        dispatch(postNewGame(input))
        console.log(input)
        alert('Un nuevo videojuego ha sido creado con éxito')
        
        navigate('/home')
        }
    }

    function hanldeDeleteG(e){
        e.preventDefault()
        setInput({
            ...input,
            genres: []
        })
    }
    function hanldeDeleteP(e){
        e.preventDefault()
        setInput({
            ...input,
            platforms: []
        })
    }

    return(
        <div>
            <NavBar className='navbarForm'/>
            <div className='formularioContenido'> 
            <form onSubmit={e=>hanldeSubmit(e)} className='formulario'>
            <div className='contenidoform'>
                <div className='letras content '>
                <label>Game name:</label>
                {errors.name && <p className="danger">{errors.name}</p>}
                <input type='text' name='name' onChange={(e)=>handleInputChange(e)}></input>
                </div>
                
                <div className='letras content '>
                <label>Released:</label>
                {errors.released && <p className="danger">{errors.released}</p>}
                <input type='text' name='released' onChange={(e)=>handleInputChange(e) } placeholder='ej: 2013-09-17'></input>
                </div>
                <div className='letras content '>
                <label>Rating:</label>
                {errors.rating && <p className="danger">{errors.rating}</p>}
                <input type='text' name='rating' onChange={(e)=>handleInputChange(e)}></input>
                </div>
                <div className='letras content '>
                <label>Genres:</label>
                {errors.genres && <p className="danger">{errors.genres}</p>}
                
            
                <select name="genre" onChange={(e)=>handleGenres(e)} required className='selects'>
                <option>Seleccione una opción</option>
                {genres?.map(el=>{
                    console.log(el.name)
                    return <option value={el.name}>{el.name}</option>
                })
                }</select>
                {input.genres.map(el=>{
                    return <div>🎮{el}<br/></div>
                })}
                {input.genres.length >0 &&<input type='button' value='x' className='borrar' onClick={e=>hanldeDeleteG(e)}></input>}
                </div>

                <div className='letras content '>
                <label>Platforms:</label>
                <select name="genre" onChange={(e)=>handlePlatforms(e)} required className='selects'>
                <option>Seleccione una opción</option>
                {platforms?.map(el=>{
                    
                    return <option value={el}>{el}</option>
                })
                }</select>
                {input.platforms.map(el=>{
                    return <div>🎮{el}<br/></div>
                })}
                {input.platforms.length >0 &&<input type='button' value='x' className='borrar' onClick={e=>hanldeDeleteP(e)}></input>}
                </div>
                <div className='letras content '>
                <label>Image:</label>
                {/* {errors.name && <p className="danger">{errors.name}</p>} */}
                <input type='text' name='background_image' onChange={(e)=>handleInputChange(e)}></input>
                </div>

                <div className='content letras'>
                <label>Description:</label>
                {errors.description && <p className="danger">{errors.description}</p>}
                <textarea  name='description' onChange={(e)=>handleInputChange(e)} className='description'></textarea>
                </div>
               
                
                <input type="submit" className='enviar'/>
                </div>
            </form>
            
            </div>

        </div>
    )
}