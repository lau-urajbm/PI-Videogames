import {CREATED_IN, GET_DETALLE, GET_GAMES, GET_PLATFORMS, GET_GENRES, GET_GENRE_FOR_FILTER, ORDER_GAMES,   ORDER_RATING, LIMPIAR_DETALLE, GET_GAME, ORDER_PLATFORMS
} from "../actions";

const intialState={
    allGames:[],
    games:[],
    genres:[],
    detail:[],
    platforms:[]

}

export function rootReducer(state=intialState, action){
    switch(action.type){
        case GET_GAMES:
        return{
            ...state,
            allGames: action.payload,
            games:action.payload
        }

        case GET_GENRE_FOR_FILTER:
        const allGames = state.allGames
        const gamesGenre = action.payload === 'All'?allGames : allGames.filter(el=>el.genres?.includes(action.payload))

            return{
            ...state,
            games: gamesGenre==='All'? allGames : gamesGenre
            }
        case GET_GENRES:
            return{
                ...state,
                genres:action.payload
            }
        
        case CREATED_IN:
            const allGames1 = state.allGames
            const from = action.payload === 'creados'? allGames1.filter(el=>el.createdInDB) : allGames1.filter(el=> !el.createdInDB)

            return{
                ...state,
                games: action.payload === 'All'? allGames1 : from
            }

        case ORDER_GAMES:
            const allGames2 = state.allGames
            const ordenados = action.payload === 'a-z'? state.games.sort(function SortArray(x, y){
                return x.name.localeCompare(y.name);
            }): state.games.sort(function SortArray(x, y){
                return y.name.localeCompare(x.name);
            })

            return{
                ...state,
                games: action.payload ==='All'? state.games
                 : ordenados
            }

        case ORDER_RATING:
            const allGames3 = state.allGames
            const ratings = action.payload ==='asc'&& action.payload !== 'All'? state.games.sort(function SortArray(x,y){
                return x.rating - y.rating
            }): action.payload !== 'All'?state.games.sort(function SortArray(x,y){
                return y.rating - x.rating
            }):state.games

            return{
                ...state,
                games:  ratings
            }

        case ORDER_PLATFORMS:
            const allGames4 = state.allGames
            const platforms = action.payload=='All'? allGames4: allGames4.filter(el=>el.platforms.includes(action.payload))
            return{
                ...state,
                games:platforms
            }

        case GET_DETALLE:
            return{
                ...state,
                detail:action.payload
            }

        case LIMPIAR_DETALLE:
            return{
                ...state,
                detail:[]
            }
        
        case GET_GAME:
            return{
                ...state,
                games: /* typeof action.payload === 'string'?'https://media.istockphoto.com/vectors/error-page-or-file-not-found-icon-vector-id924949200': */action.payload
            }
        
        case GET_PLATFORMS:
            return{
                ...state,
                platforms: action.payload
            }


        default: return  state
    }
}
export default rootReducer;