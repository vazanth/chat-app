import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
//components
import Spinner from './components/Spinner';
//css
import './App.css';
//apollo
import { ApolloProvider } from '@apollo/client';
import client from './services/api';
//store
import { AuthProvider } from './context/Auth';
//lazy component imports
const Register = lazy(()=> import('./pages/auth/register/Register'));
const Login = lazy(()=> import('./pages/auth/login/Login'));
const HomeWrapper = lazy(()=> import('./pages/home/HomeWrapper'));
const DyanmicRoute = lazy(()=> import('./components/DyanmicRoute'));

const App = () => {
  return (
    <Fragment>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Suspense fallback={<Spinner />}>
            <BrowserRouter>
              <Switch>
                <DyanmicRoute exact={true} from="/" to="/login" role="guest"/>
                <DyanmicRoute path="/login" content={Login} role="guest" />
                <DyanmicRoute path="/register" content={Register} role="guest" />
                <DyanmicRoute path="/home" content={HomeWrapper} role="authenticated"/>
              </Switch>
            </BrowserRouter>
          </Suspense>
        </AuthProvider>
      </ApolloProvider>
    </Fragment>
  );
}

export default App
