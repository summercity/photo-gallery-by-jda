import { all, call, put, select, takeLatest, fork } from 'redux-saga/effects';
import ActionTypes from './constants';
import request, { getFormData } from 'utils/request';
import { API_BASE_URL } from 'containers/App/constants';
import { setList, setDropzoneKey, setIsLimit } from './actions';
import { setLoadingAppAction } from '../../containers/App/actions';
import makeSelectGallery from './selectors';
import { Image } from './types';

export function* getImageList(args: any) {
  yield put(setLoadingAppAction(true));
  const { payload }: { payload: Image[] } = args;
  const { isLimit } = yield select(makeSelectGallery());
  try {
    if (!isLimit) {
      const req = yield call(request, `${API_BASE_URL}/photos/list`, {
        method: 'POST',
        body: getFormData(payload),
      });
      const { documents: images } = req;
      if (images.length <= 0 || !images) {
        yield put(setIsLimit(true));
        alert('No data found!');
      }
      yield put(setList(images));
    } else {
      alert('No data found!');
    }
    yield put(setLoadingAppAction(false));
  } catch (error) {
    yield put(setLoadingAppAction(false));
    // TODO: GLOBAL ACTION
    console.log('error');
  }
}

export function* uploadImage(args: any) {
  yield put(setLoadingAppAction(true));
  const { payload } = args;
  try {
    const req = yield call(request, `${API_BASE_URL}/photos`, {
      method: 'PUT',
      body: payload,
    });

    yield put(setDropzoneKey(Math.random()));
    yield put(setLoadingAppAction(false));
    alert('Uploaded successfully!');
  } catch (error) {
    yield put(setLoadingAppAction(false));
    // TODO: GLOBAL ACTION
    console.log('error');
  }
}

export function* watchGetImageListSaga() {
  yield takeLatest(ActionTypes.GET_IMAGE_LIST, getImageList);
}

export function* watchUploadImageSaga() {
  yield takeLatest(ActionTypes.UPLOAD_IMAGE, uploadImage);
}

export default function* recurringSaga() {
  yield all([fork(watchGetImageListSaga), fork(watchUploadImageSaga)]);
}
