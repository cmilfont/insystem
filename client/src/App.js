import 'whatwg-fetch';

import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { IndexRedirect, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import './App.css';

import ApiReducers from 'api/reducers';
import Sagas from 'api/sagas';

import Base from 'components/Base.jsx';
import Activities from 'components/activities/Activities.jsx';
import Login from 'components/user/Login.jsx';
import Register from 'components/user/Register.jsx';
import ResetPassword from 'components/user/ResetPassword.jsx';

class App extends Component {

  render() {

    const sagaMiddleware = createSagaMiddleware({
      onError: (error) => {
        //airbrake.notify(error);
      }
    });

    const reducers = combineReducers({
      routing: routerReducer,
      ...ApiReducers,
    });

    const middlewares = [
      routerMiddleware(browserHistory),
      sagaMiddleware,
    ];

    const store = createStore(
      reducers,
      compose(applyMiddleware(...middlewares))
    );

    const history = syncHistoryWithStore(browserHistory, store);

    const validateUser = (nextState, replace, callback) => {
        const { user } = store.getState();
        if (user && !user.id) {
          replace('/login');
        }
        callback();
      };

      function logPageView() {
        //window.ReactGA.set({ page: window.location.pathname });
        //window.ReactGA.pageview(window.location.pathname);
      }

      sagaMiddleware.run(Sagas);

    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Base}>
            <IndexRedirect to="/activities" />
            <Route path="/activities" component={Activities} onEnter={validateUser} onUpdate={logPageView} />
          </Route>
          <Route path="/login" component={Login} onUpdate={logPageView} />
          <Route path="/register" component={Register} onUpdate={logPageView} />
          <Route path="/reset/password" component={ResetPassword} onUpdate={logPageView} />
        </Router>
      </Provider>
    );
  }
}

export default App;
