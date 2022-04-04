import './NavBar.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation} from "react-router-dom";
import { getGames } from '../../actions';


/*  */


export default function NavBar(){
const dispatch = useDispatch();
const location=useLocation()

const {pathname}=location
const splitLocation = pathname.split("/");

const games =useSelector(state=>state.games);
 function handleClick(e){
    e.preventDefault()
    dispatch(getGames())
    
 }


    return(
        <div className={splitLocation[1] === "videogame" ?'navbarForm': 'contenedor1 '}>
           <div className={splitLocation[1] === "videogame" ?'logoTextoForm' :'logoTexto'}> {<img src='https://i.kym-cdn.com/photos/images/original/001/988/928/c58.gif' width='15%'  className={splitLocation[1] === "game" ?'logoForm':'logo'}/>}
            <h1 className='titulo' onClick={(e)=>handleClick(e)}><Link to='/home' className='titulo' >VIDEOGAMES</Link></h1>
            </div>
            <Link to='/videogame' className={splitLocation[1] === "videogame" ? 'formcreacion':'creacion'}>
              <h2>Crea un nuevo Juego</h2>
            </Link>
        </div>  
            
            
        
    )
}