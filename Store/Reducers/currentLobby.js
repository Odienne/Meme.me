const initialState = {lobby: null}

function toggleLobby(state = initialState, action) {
    let nextState;

    switch(action.type) {
        case 'SET_LOBBY':
                nextState = {
                    ...state,
                    lobby: action.value
                }
            return nextState || state;
        default :
            return state;
    }
}

export default toggleLobby