import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the gallery state domain
 */

const selectGalleryDomain = (state: ApplicationRootState) =>
  state || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Gallery
 */

const makeSelectGallery = () =>
  createSelector(selectGalleryDomain, substate => substate.gallery);

export default makeSelectGallery;
export { selectGalleryDomain };
