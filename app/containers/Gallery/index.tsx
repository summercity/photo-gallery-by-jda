/*
 *
 * Gallery
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Modal } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import Toggle from 'components/Toggle';
import makeSelectGallery from './selectors';
import { makeSelectLoading } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { getList, setPagination, setIsLimit } from './actions';
import messages from './messages';
import '../../styles/Gallery.css';
import PhotoUploader from 'containers/PhotoUploader';
import List from 'components/List';

const stateSelector = createStructuredSelector({
  gallery: makeSelectGallery(),
  loading: makeSelectLoading(),
});

interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Gallery(props: Props) {
  useInjectReducer({ key: 'gallery', reducer: reducer });
  useInjectSaga({ key: 'gallery', saga: saga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { gallery, loading } = useSelector(stateSelector);
  const { images, pagination } = gallery;
  const { skip, limit } = pagination;
  const dispatch = useDispatch();

  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleLoadMore = () => {
    const newSkip = parseInt(skip) + parseInt(limit);
    dispatch(setPagination({ ...pagination, skip: newSkip }));
  };

  const list = () => {
    dispatch(getList(pagination));
  };

  const debounceList = useCallback(debounce(list, 500), [pagination]);

  useEffect(() => {
    list();
    // Avoid multiple API request
    return debounceList.cancel;
  }, [pagination]);

  const handleLimitToggle = e => {
    dispatch(setIsLimit(false));
    dispatch(setPagination({ skip: 0, limit: e.target.value }));
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Helmet>
        <title>Gallery</title>
        <meta name="description" content="Description of Gallery" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <div className="header-wrapper">
        <div className="page-title">
          <h2>Photos</h2>
        </div>
        <div className="topControls">
          <span onClick={showModal}>
            <CloudUploadOutlined style={{ verticalAlign: 'middle' }} />
            <span> Upload</span>
          </span>
          |
          <Toggle
            value={limit}
            values={[5, 10, 25, 50]}
            messages={messages}
            onToggle={handleLimitToggle}
          />
        </div>
      </div>

      <List images={images} loading={loading} />
      <div className="footerControl" onClick={handleLoadMore}>
        Load More
      </div>

      <Modal
        title="Upload photos"
        visible={visible}
        footer={[]}
        onCancel={handleCancel}
      >
        <PhotoUploader />
      </Modal>
    </>
  );
}

export default Gallery;
