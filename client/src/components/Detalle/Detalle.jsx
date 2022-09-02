import './Detalle.css'
import React from "react";
import { Link, useParams} from 'react-router-dom';
import { getDetalle, limpiarDetalle} from '../../actions';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../NavBar/NavBar';


export default function Detalle(){

    const {idVideogame} = useParams()
    const gameDetail = useSelector(state=>state.detail)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetalle(idVideogame))
        dispatch(limpiarDetalle())
       
       
    }, [idVideogame])
  

    return(
        <div style={{backgroundImage:`url(https://i.pinimg.com/originals/02/d2/1b/02d21b81d369ae00c8429bf586747790.jpg)`,  backgroundSize:'100vw 100vh', backgroundAttachment:'fixed', height:'100vh'}}>
            <NavBar/>

            {gameDetail.length > 0?
                
                <div className='container'>
                     <h1 className='tituloD'>{gameDetail[0].name} </h1>
                     <center><img src={gameDetail[0].background_image} width='45%' className='game'/></center>
                     <div className="detalles">
                    <div className='noDes'>
                     <div>GENRES: <br/>{gameDetail[0].genres.join(', ')}</div><br/> 
                     
                     <div>RELEASED: <br/> {gameDetail[0].released}</div><br/> 
                     <div>RATING: {gameDetail[0].rating}</div><br/> 
                     <div>PLATFORMS: <br/> {gameDetail[0].platforms.join(', ')}</div><br/> 
                     </div>
                    <center> <p>---------------------------------------</p></center>
                     <div className='descrip'>DESCRIPTION: {gameDetail[0].description}</div>
                     </div>
                     
                </div>:


                <div>
                    <center><img className='cargando' src='https://images.hive.blog/DQmXcKcmJGepSdojMB4koPtdavGAfJMaDktvXaB2mAWK7GK/loading.gif' /></center>
                </div>
            
            
            }



        </div>
    )
}
