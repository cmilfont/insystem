import { fork } from 'redux-saga/effects';

import watchLogin from 'api/sagas/login.js';
import watchRegister from 'api/sagas/register.js';

export default function* rootSaga() {
  yield fork(watchLogin);
  yield fork(watchRegister);
}
