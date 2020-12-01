import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//type
import { T_STATE } from '../type/Auth';
//interface
import { I_ROUTE } from '../interface';
//store
import { useAuthState } from '../context/Auth';

const App = (props: I_ROUTE) => {
  const user: T_STATE = useAuthState();
  if (props?.role === "authenticated" && !user.isAuth) {
    return <Redirect to="/login" />
  } else if (props?.role === "guest"  && props?.exact) {
    return <Redirect to="/login" />
  } else {
    return <Route component={props.content} {...props} />
  }
}

export default App
