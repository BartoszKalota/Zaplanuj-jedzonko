import React, { useEffect } from 'react';
 
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../ROUTES';

const withAuthorization = (Component) => {
  const WithAuthorization = (props) => {
    useEffect(() => {
      props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!authUser) {
            props.history.push(ROUTES.LOGIN);
          }
        }
      );
    }, []);
    return (
      <AuthUserContext.Consumer>
        {authUser => !!authUser && <Component {...props} />}
      </AuthUserContext.Consumer>
    );
  };

  return withFirebase(WithAuthorization);
};
 
export default withAuthorization;