import  './Home.css'
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {Card} from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import Paginado from '../Paginado/Paginado';
import { getGames,getGenreForFilter, getGenres, createdInFilter, aBCOrderFilter, ratingOrderFilter, platformsOrderFilter } from '../../actions';
import SearchBar from '../SearchBar/SearchBar';

export default function Home(){

const dispatch = useDispatch()
const games = useSelector(state=>state.games)
const genres = useSelector(state=>state.genres)
const platforms = useSelector(state=>state.platforms)

const [PagActual, setPagActual] = useState(1);
const [order, setOrder]= useState('')
const [nGamesPag, setNGamesPag] = useState(15)
const IndexlastGame = PagActual * nGamesPag;//15
const indexFirstGame = IndexlastGame - nGamesPag;//0
const currGames = games.slice(indexFirstGame, IndexlastGame); 




useEffect(()=>{
    dispatch(getGames())
    dispatch(getGenres())
}, [])
function paginado(n){
    setPagActual(n)
}

function handleClick(event) {
    event.preventDefault();
    setPagActual(1)
    dispatch(getGames())
    
  }

function handleGenreChange(e){
    e.preventDefault()
    setPagActual(1)
   dispatch(getGenreForFilter(e.target.value))
} 
function handleOriginS(e){
    e.preventDefault()
    setPagActual(1)
    dispatch(createdInFilter(e.target.value))
}
function handleABCOrder(e){
    e.preventDefault()
    setPagActual(1)  
    dispatch(aBCOrderFilter(e.target.value))
    setOrder(e.target.value)
}

function handleRatingOrder(e){
    e.preventDefault()
    setPagActual(1)  
    dispatch(ratingOrderFilter(e.target.value))
    setOrder(e.target.value)
}
 function handlePlatformFilter(e){
    e.preventDefault()
    setPagActual(1) 
    dispatch(platformsOrderFilter(e.target.value))
    setOrder(e.target.value)

 }


    return(
        <div>
            <NavBar/>
            
            {games.length >0?
            
            <div> 

            <SearchBar/>
            <div className='filters'>
            
            <button onClick={(e)=>handleClick(e) } className='boton'>
                volver a cargar <br/>todos los Juegos
            </button>
            <div>
            <label>Genres</label>
            <select name="genre" onChange={(e)=>handleGenreChange(e)} >
                <option value='All'>All</option>
                {genres?.map(el=>{
                    console.log(el.name)
                    if(el.name!=="Board Games"&&el.name!=="Educational"&&el.name!=="Card")
                    return <option value={el.name}>{el.name}</option>
                })
            }</select>
            </div>

            <div>
                <label>Platforms</label>
                <select name='platforms' onChange={(e)=>handlePlatformFilter(e)}>
                <option value='All'>All</option>
                   {platforms.map(e=>{
                       return <option value={e}>{e}</option>
                   })} 
                    
                </select>
            </div>
            
            <div>
            <label >VideoGames</label>
            <select name="game" onChange={(e)=>handleOriginS(e)}>
            <option value='All'>All</option>
            <option value='existentes'>Existentes</option>
            <option value='creados'>Creados</option>
            </select>
            </div>

            <div>
            <label >Order</label>
            <select name="game" onChange={(e)=>handleABCOrder(e)}>
            <option value='All'>All</option>
            <option value='a-z'>a-z</option>
            <option value='z-a'>z-a</option>
            </select>
            </div>
            
            <div>
            <label >Ratings</label>
            <select name="game" onChange={(e)=>handleRatingOrder(e)}>
            <option value='All'>All</option>
            <option value='asc'>asc</option>
            <option value='desc'>desc</option>
            </select>
            </div>
            </div></div>:

 <div><img src='https://64.media.tumblr.com/c068ec27691d65b55a95307cd5140b4b/735ed27d674e5288-7d/s400x600/503a363de313d591d58bb2ed9f75c650b5503f28.gifv' width='20%'  className='load' ></img></div> 
 }
            

           <Paginado nGamesPag={nGamesPag} games={games.length} paginado={paginado} />
        <div className='contenedor'>
            {currGames?.map(el=>{
                return(
               <div className='card'> 
               <Link to={`/home/${el.id}`} className='detalle'>
               <Card name={el.name} background_image={el.background_image} genres={el.genres} key={el.id} rating={el.rating} />
               </Link>
               </div>
                )
                
            })}
        </div>
        

        </div>
    )
}