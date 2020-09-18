/*
 *
 * Gallery actions
 *
 */

import { action } from 'typesafe-actions';
import { GalleryPagination, Image } from './types';

import ActionTypes from './constants';

export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);

export const getList = (payload: GalleryPagination) =>
  action(ActionTypes.GET_IMAGE_LIST, payload);

export const setList = (payload: Image[]) =>
  action(ActionTypes.SET_IMAGE_LIST, payload);

export const setDropzoneKey = (payload: number) =>
  action(ActionTypes.SET_DROPZONE_KEY, payload);

export const setPagination = (payload: GalleryPagination) =>
  action(ActionTypes.SET_IMAGE_PAGINATION, payload);

export const setIsLimit = (payload: boolean) =>
  action(ActionTypes.SET_IS_LIMIT, payload);

export const uploadImage = (payload: any) =>
  action(ActionTypes.UPLOAD_IMAGE, payload);
