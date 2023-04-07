import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {AppState} from "@/store/store"
import {bindActionCreators} from "redux"
import {PostsActions} from "@/store/slices/posts"

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

const actions = {
  ...PostsActions
}

export type TActionKeys = keyof typeof actions

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(actions, dispatch)
}