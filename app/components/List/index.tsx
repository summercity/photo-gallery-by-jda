/**
 *
 * List
 *
 */
import React, { memo } from 'react';
import { Card, Row, Col } from 'antd';
import { Image } from '../../containers/Gallery/types';
import LoadingIndicator from '../LoadingIndicator';
import '../../styles/Gallery.css';

interface Props {
  images: Image[];
  loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function List(props: Props) {
  const { images, loading } = props;
  return (
    <div>
      <Row gutter={16}>
        {images?.map((image, i) => (
          <Col key={`col-${image}-${i}`} className="ant-custom-col">
            <Card
              className="custom-card"
              key={`card-${image}-${i}`}
              bordered={false}
              hoverable
            >
              {loading && <LoadingIndicator />}
              <img className="gallery-img" alt={image.name} src={image.raw} />
              <div className="card-details-text">{image.name}</div>
              <div className="card-details-text">{image.album}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default memo(List);
