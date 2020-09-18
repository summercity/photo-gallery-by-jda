import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the photoUploader state domain
 */

const selectPhotoUploaderDomain = (state: ApplicationRootState) =>
  state || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PhotoUploader
 */

const makeSelectPhotoUploader = () =>
  createSelector(selectPhotoUploaderDomain, substate => substate);

export default makeSelectPhotoUploader;
export { selectPhotoUploaderDomain };
