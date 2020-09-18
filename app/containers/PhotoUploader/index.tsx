/*
 *
 * PhotoUploader
 *
 */

import React, { ChangeEvent, useState } from 'react';
import Dropzone, {
  IDropzoneProps,
  ILayoutProps,
} from 'react-dropzone-uploader';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { CloudUploadOutlined } from '@ant-design/icons';
// import { UploadImage } from './types';
import Toggle from 'components/Toggle';

import 'react-dropzone-uploader/dist/styles.css';
import makeSelectPhotoUploader from './selectors';
import makeSelectGallery from '../Gallery/selectors';
import reducer from './reducer';
import saga from './saga';
import { uploadImage } from '../Gallery/actions';
import messages from './messages';
import '../../styles/Gallery.css';

const stateSelector = createStructuredSelector({
  photoUploader: makeSelectPhotoUploader(),
  gallery: makeSelectGallery(),
});

interface Props {}

// add type defs to custom LayoutComponent prop to easily inspect props passed to injected components
const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: ILayoutProps) => {
  return (
    <div>
      {previews}

      <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

      {files.length > 0 && submitButton}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PhotoUploader(props: Props) {
  useInjectReducer({ key: 'photoUploader', reducer: reducer });
  useInjectSaga({ key: 'photoUploader', saga: saga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { photoUploader, gallery } = useSelector(stateSelector);
  const { dropzoneKey } = gallery;
  const dispatch = useDispatch(); // eslint-disable-line @typescript-eslint/no-unused-vars

  // add type defs to function props to get TS support inside function bodies,
  // and not just where functions are passed as props into Dropzone
  // const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({
  //   url: 'https://httpbin.org/post',
  // });

  // const [album, setAlbum] = useState<string>('Select album');
  const [album, setAlbum] = useState<string>('Select album');
  // const [keyDropzone, setKey] = useState<number>(0);

  const formData = new FormData();
  const getUploadParams: IDropzoneProps['getUploadParams'] = ({ file }) => {
    // const body = new FormData()
    // formData.append('documents', file);
    // var object = {};
    // formData.forEach(function (value, key) {
    //   object[key] = value;
    // });
    // var json = JSON.stringify(object);
    // console.log('formData', json.documents);
    // const { documents } = newImages;
    // documents.push(file);
    // setNewImages({ ...newImages, json });
    return { url: 'https://httpbin.org/post' };
  };

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    if (album === 'Select album') {
      alert('Please select an album!');
    } else {
      formData.delete('documents');
      formData.delete('album');

      formData.append('album', album);
      allFiles.forEach(f => formData.append('documents', f.file));
      dispatch(uploadImage(formData));
    }

    // fetch('http://3.129.11.172:8888/photos', {
    //   method: 'PUT',
    //   body: formData,
    // })
    //   .then(response => response.json())
    //   .then(success => {
    //     // Do something with the successful response
    //     console.log('success', success);
    //   })
    //   .catch(error => console.log('error', error));
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
    // formData.append('documents', file);
    // setNewImages({ ...newImages, documents: file });
  };

  const handleToggleAlbum = (e: ChangeEvent<HTMLInputElement>) => {
    setAlbum(e.target.value);
  };

  return (
    <div>
      <Dropzone
        key={dropzoneKey}
        LayoutComponent={Layout}
        onSubmit={handleSubmit}
        // classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
        inputContent="Drag 'n' some files here, or click to select files."
        submitButtonContent={
          <span>
            <CloudUploadOutlined style={{ verticalAlign: 'middle' }} /> Upload
          </span>
        }
        accept="image/*"
      />
      <Toggle
        className="toggle-album"
        value={album}
        values={[
          'Select album',
          'travel',
          'personal',
          'food',
          'nature',
          'other',
        ]}
        messages={messages}
        onToggle={handleToggleAlbum}
      />
      ,
    </div>
  );
}

export default PhotoUploader;
