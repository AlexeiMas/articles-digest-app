import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit"
import {createWrapper} from "next-redux-wrapper"
import {postsReducer} from "@/store/slices/posts"
import {persistReducer, persistStore} from "redux-persist"
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist"
import {postsApi} from "@/store/apis/posts.api"
import {tagsApi} from "@/store/apis/tags.api"
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const createNoopStorage = () => {
  return {
    getItem: (_key: any) => Promise.resolve(null),
    setItem: (_key: any, value: any) => Promise.resolve(value),
    removeItem: (_key: any) => Promise.resolve()
  }
}
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const rootReducer = combineReducers({
  posts: postsReducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer
})

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  })

const makeStore = () => {
  const isServer = typeof window === "undefined"
  if (isServer) {
    return makeConfiguredStore()
  } else {
    const persistConfig = {
      key: "root",
      whitelist: ["posts"], //list of reducers
      version: 1,
      storage
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    let store: any = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          },
        }).concat(postsApi.middleware, tagsApi.middleware)
    })
    store.__persistor = persistStore(store)
    return store
  }
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  AppState,
  unknown,
  Action>;

export const wrapper = createWrapper<AppStore>(makeStore)