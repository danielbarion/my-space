import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.styl';
import 'assets/css/base.styl'
import Home from './modules/home/component'
import App from './modules/app/component'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MySpaceContext from 'context/myspace'

ReactDOM.render(
  <MySpaceContext>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/app' component={App} />
        <Route path='*' component={Home} />
      </Switch>
    </ BrowserRouter>
  </MySpaceContext>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
