import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import "./App.css";
import asyncComponent from "./hoc/asyncComponent";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import usersReducer from "./store/reducers/users";
import albumsReducer from "./store/reducers/albums";
import photosReducer from "./store/reducers/photos";
import { watchUsers, watchAlbums, watchPhotos } from "./store/sagas";

const sagaMiddleware = createSagaMiddleware();

const Users = asyncComponent(() => import("./components/Users/Users"));
const User = asyncComponent(() => import("./components/User/User"));
const Albums = asyncComponent(() => import("./components/Albums/Albums"));
const Album = asyncComponent(() => import("./components/Album/Album"));
const Photos = asyncComponent(() => import("./components/Photos/Photos"));
const Photo = asyncComponent(() => import("./components/Photo/Photo"));

const logger = store => {
  return next => {
    return action => {
      process.env.NODE_ENV === "development" &&
        console.log("[Middleware logger] :: dispatching action", action);
      const result = next(action);
      process.env.NODE_ENV === "development" &&
        console.log("[Middleware logger] :: next state", store.getState());
      return result;
    };
  };
};

const componseEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  usersReducer,
  albumsReducer,
  photosReducer
});

const store = createStore(
  rootReducer,
  componseEnhancers(applyMiddleware(logger, thunk, sagaMiddleware))
);

sagaMiddleware.run(watchUsers);
sagaMiddleware.run(watchAlbums);
sagaMiddleware.run(watchPhotos);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/users" exact component={Users} />
              <Route path="/users/:id" component={User} />
              <Route path="/albums" exact component={Albums} />
              <Route path="/albums/:id" component={Album} />
              <Route path="/photos" exact component={Photos} />
              <Route path="/photos/:id" component={Photo} />
              <Redirect from="/" to="/home" />
              <Route
                render={() => {
                  return <h1 style={{ textAlign: "center" }}>Not found.</h1>;
                }}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
