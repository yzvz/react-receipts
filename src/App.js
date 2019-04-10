import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import './App.css';
import asyncComponent from './hoc/asyncComponent';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import usersReducer from './store/reducers/users';
import albumsReducer from './store/reducers/albums';
import { watchUsers, watchAlbums } from './store/sagas';

const sagaMiddleware = createSagaMiddleware();

const Users = asyncComponent(() => {
  return import ('./components/Users/Users');
});

const User = asyncComponent(() => {
  return import ('./components/User/User');
});

const Albums = asyncComponent(() => {
  return import ('./components/Albums/Albums');
});

const logger = (store) => {
  return next => {
    return action => {
      process.env.NODE_ENV === 'development' && console.log('[Middleware logger] :: dispatching action', action);
      const result = next(action);
      process.env.NODE_ENV === 'development' && console.log('[Middleware logger] :: next state', store.getState());
      return result;
    }
  }
}

const componseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  usersReducer, albumsReducer
});

const store = createStore(rootReducer,
  componseEnhancers(
    applyMiddleware(logger, thunk, sagaMiddleware)
  )
);

sagaMiddleware.run(watchUsers);
sagaMiddleware.run(watchAlbums);

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
              <Redirect from="/" to="/home" />
              <Route render={() => {
                return (
                  <h1 style={{textAlign: 'center'}}>Not found.</h1>
                );
              }}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
