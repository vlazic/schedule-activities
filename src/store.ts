import { applyMiddleware, compose, createStore } from "redux";
import thunk, {
  ThunkAction,
  ThunkMiddleware,
  ThunkDispatch
} from "redux-thunk";
import { reducers, IState, IActions } from "./reducers";
import Container from "./container";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type IThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IState,
  Container,
  IActions
>;
export type IDispatch = ThunkDispatch<IState, Container, IActions>;
export type IThunkMiddleware = ThunkMiddleware<IState, IActions, Container>;

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = (container: Container) =>
  createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(container) as IThunkMiddleware)
    )
  );

export default store;
