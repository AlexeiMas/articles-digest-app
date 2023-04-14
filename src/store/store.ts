import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit"
import {createWrapper} from "next-redux-wrapper"
import {postsReducer} from "@/store/slices/posts"
import {persistReducer, persistStore} from "redux-persist"
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist"
import {postsApi} from "@/store/services/posts.api"
import {tagsApi} from "@/store/services/tags.api"
import {uploadsApi} from "@/store/services/uploads.api"
import {imagesApi} from "@/store/services/images.api"
import {commentsApi} from "@/store/services/comments.api"

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
  [tagsApi.reducerPath]: tagsApi.reducer,
  [uploadsApi.reducerPath]: uploadsApi.reducer,
  [imagesApi.reducerPath]: imagesApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer
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
        }).concat(postsApi.middleware, tagsApi.middleware, uploadsApi.middleware, imagesApi.middleware, commentsApi.middleware)
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