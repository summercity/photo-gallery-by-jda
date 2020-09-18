/*
 *
 * Gallery reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  default: null,
  pagination: {
    skip: 0,
    limit: 5,
  },
  images: [],
  dropzoneKey: 0,
  openUploaded: false,
  isLimit: false,
};

function galleryReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.DEFAULT_ACTION:
      return state;
    case ActionTypes.SET_IMAGE_LIST:
      if (state.pagination.skip === 0) {
        return { ...state, images: action.payload };
      }
      const newState = Object.assign({}, state, {
        images: state.images,
      });
      newState.images.push(action.payload);
      return { ...state, images: newState.images.flat() };
    case ActionTypes.SET_DROPZONE_KEY:
      return { ...state, dropzoneKey: action.payload };
    case ActionTypes.SET_IMAGE_PAGINATION:
      return { ...state, pagination: action.payload };
    case ActionTypes.SET_IS_LIMIT:
      return { ...state, isLimit: action.payload };
    default:
      return state;
  }
}

export default galleryReducer;
