import { createStore } from "redux";

const initialState = ({
    mobile : ''
}) 

function appReducer(prevState = initialState, action){
    switch(action.type) {
        case 'mobile':
            return {
                ...prevState,
                mobile : action.payload
            }
        default:
            return prevState
    }
}

const Store = createStore(appReducer)
export default Store