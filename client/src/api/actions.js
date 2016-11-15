export const NAMESPACE = 'BIOHACKING';

export const user = {
  login: `${NAMESPACE}_USER_LOGIN`,
  loginFailure: `${NAMESPACE}_USER_LOGIN_ERROR`,
  logged: `${NAMESPACE}_USER_LOGGED`,
  loaded: `${NAMESPACE}_USER_LOADED`,
  logout: `${NAMESPACE}_USER_LOGOUT`,
  register: `${NAMESPACE}_USER_REGISTER`,
  registerFailure: `${NAMESPACE}_USER_ERROR`,
  reset: `${NAMESPACE}_USER_RESET_PASSWORD`,
  resetFailure: `${NAMESPACE}_USER_RESET_PASSWORD_ERROR`,
  hasBeenReset: `${NAMESPACE}_USER_HAS_BEEN_RESET_PASSWORD_MESSAGE`,
}

export const error = {
  login: `${NAMESPACE}_ERROR_LOGIN`,
}

const actions = {
  error,
  user
}

export const nextAction = (type) => ({
  success: (payload) => ({
    type: `${type}_SUCCESS`,
    payload
  })
});


export const defaultAction = (dispatch, actionType) => {
  return (payload) => {
    dispatch({
      type: actionType,
      payload,
    });
  }
}

export const doLoginAction = (dispatch) => {
  return {
    doLogin: defaultAction(dispatch, actions.user.login),
    doRegister: defaultAction(dispatch, actions.user.register),
    doReset: defaultAction(dispatch, actions.user.reset),
  }
}

export const doLogoutAction = (dispatch) => {
  return {
    doLogout: defaultAction(dispatch, actions.user.logout),
  }
}

export default actions;
