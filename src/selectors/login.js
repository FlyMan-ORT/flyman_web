import { createSelector } from '@reduxjs/toolkit';

const getLoginState = (state) => state.login;

export const getSuccessfulLogin = createSelector([getLoginState], (state) => state?.data);

export const isFailedLogin = createSelector([getLoginState], (state) => state?.error);

export const areInvalidUserCredentials = createSelector(
  [isFailedLogin],
  (error) => error?.errorMessage === 'Invalid user credentials'
);
export const isPostingLogin = createSelector([getLoginState], (state) => state?.pending);
