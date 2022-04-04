import axios from 'axios'
export const GET_GAMES='GET_GAMES';
export const CREATED_IN = 'CREATED_IN'
export const GET_GENRE_FOR_FILTER ='GET_GENRE_FOR_FILTER';
export const GET_GENRES = 'GET_GENRES'
export const ORDER_GAMES ='ORDER_GAMES';
export const ORDER_RATING = 'ORDER_RATING';
export const GET_DETALLE='GET_DETALLE';
export const LIMPIAR_DETALLE='LIMPIAR_DETALLE'
export const GET_GAME='GET_GAME'; 
export const GET_PLATFORMS='GET_PLATFORMS';
export const ORDER_PLATFORMS='ORDER_PLATFORMS'


export function getGames(){
    return function(dispatch){
        return fetch('http://localhost:3001/videogames')
        .then(res => res.json())
        .then(data =>{
            dispatch({type: GET_GAMES, payload: data})
        })
}}

export function getGenreForFilter(payload){
    return{
        type: GET_GENRE_FOR_FILTER,
        payload
        
    }}

export function getGenres(){
    return function(dispatch){
        return fetch('http://localhost:3001/genres')
        .then(res => res.json())
        .then(data =>{
            dispatch({type: GET_GENRES, payload: data})
        })
}}

export function createdInFilter(payload){
    return{
        type: CREATED_IN,
        payload
        
    }}

export function aBCOrderFilter(payload){
    return{
            type: ORDER_GAMES,
            payload
            
}}

export function ratingOrderFilter(payload){
    return{
            type: ORDER_RATING,
            payload
            
}}

export function platformsOrderFilter(payload){
    return{
        type: ORDER_PLATFORMS,
        payload
    }
}

export function getDetalle(idVideogame){
    return function(dispatch){
        return fetch(`http://localhost:3001/videogames/${idVideogame}`)
        .then(res => res.json())
        .then(data =>{
            dispatch({type: GET_DETALLE, payload: data})
        })

}}

export function limpiarDetalle(){
    return{
            type: LIMPIAR_DETALLE
            
            
}}

export function getGame(name){
    return function(dispatch){
        return fetch(`http://localhost:3001/videogames?name=${name}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            dispatch({type: GET_GAME, payload: Array.isArray(data) ?data:'https://media.istockphoto.com/vectors/error-page-or-file-not-found-icon-vector-id924949200' /* ===['NO ENCONTRADO']?:data */})
        })
}}

export function getPlatforms(){
    return function(dispatch){
        return fetch(`http://localhost:3001/platforms`)
        .then(res => res.json())
        .then(data =>{
            dispatch({type: GET_PLATFORMS, payload: data})
        })
}
}

export function postNewGame(payload){
    return async function(dispatch){
        const res = await axios.post('http://localhost:3001/videogame', payload)
        
       return res
    }
}
