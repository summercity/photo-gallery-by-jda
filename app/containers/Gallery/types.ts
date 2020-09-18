import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */
interface GalleryState {
  readonly default: any;
  readonly pagination: GalleryPagination;
  readonly images: Image[] | any;
  readonly dropzoneKey: number;
  readonly openUploaded: boolean;
  readonly isLimit: boolean;
}

type GalleryPagination = {
  skip: any;
  limit: any;
};

type UploadImage = {
  album: string;
  documents: any;
};

type Image = {
  id: string;
  album: string;
  name: string;
  path: string;
  raw: string;
};

/* --- ACTIONS --- */
type GalleryActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type ContainerState = GalleryState;
type ContainerActions = GalleryActions;

export {
  ContainerState,
  ContainerActions,
  GalleryPagination,
  Image,
  UploadImage,
};
