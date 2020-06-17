import {
    ADD_PUBLICATION,
    CHANGE_PUBLICATION_INPUT,
    SET_CURRENT_PROFILE,
    SET_LOADING_STATUS,
    SET_AUTHENTICATED_USER,
} from '../constants/actionTypes'

let initialState = {
    publicationsList: [
        {publicationContent: 'agagag'},
        {publicationContent: 'go go go'},
        {publicationContent: 'one'},
    ],
    inputValue: '',
    currentProfile: {},
    inLoading: true,
    authenticatedUser: {
        id: '',
        login: '',
        email: '',
    },
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PUBLICATION:
            let newState = {...state}
            newState.publicationsList = [...state.publicationsList]
            newState.publicationsList.push({publicationContent: state.inputValue})
            newState.inputValue = ''
            return newState
        case CHANGE_PUBLICATION_INPUT: {
            let newState = {...state}
            newState.inputValue = action.value
            return newState
        }
        case SET_CURRENT_PROFILE: {
            return {...state, currentProfile: action.currentProfile}
        }
        case SET_LOADING_STATUS: {
            return {
                ...state,
                inLoading: action.loadingInProgress,
            }
        }
        case SET_AUTHENTICATED_USER: {
            return {
                ...state,
                authenticatedUser: action.user,
            }
        }

        default:
            return state
    }
}

export default profileReducer
