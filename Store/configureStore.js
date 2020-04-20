// Store/configureStore.js

import { createStore } from 'redux'
import toggleLobby from './Reducers/currentLobby'
import { persistCombineReducers, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
    key: 'root',
    storage: storage
}

export default createStore(persistReducer(rootPersistConfig, toggleLobby))