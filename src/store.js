import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers/index';

const devTools = (name = 'Debugging') =>
  process.env.NODE_ENV === 'development' && window.devToolsExtension
    ? window.devToolsExtension({ name, id: name })
    : f => f;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (initialState={}) => {
  return createStore(
    persistedReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      devTools()
    )
  );
}

export const store = configureStore();
export const persistor = persistStore(store)
