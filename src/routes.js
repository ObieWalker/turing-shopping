import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from './components/layout/index';
import Profile from './components/user/Profile';
import NotFound from './components/errors/NotFound';
import isAuthenticated from './helpers/HOCs/isAuthenticated';

const routes = [
  {
    component: Index,
    exact: true,
    path: "/",
  },
  {
    component: isAuthenticated(Profile),
    exact: true,
    path: "/profile",
  },
  {
    component: NotFound,
  }
]

export default (
  <Switch>
    {routes.map((props, i) =>
      <Route
        key={i}
        exact={props.exact}
        path={props.path}
        component={props.component}
      />
    )}
  </Switch>
)
