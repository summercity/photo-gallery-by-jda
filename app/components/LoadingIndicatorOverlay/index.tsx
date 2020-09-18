/**
 *
 * LoadingIndicatorOverlay
 *
 */
import React, { memo } from 'react';

// import styled from 'styles/styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import '../../styles/Gallery.css';

interface Props {
  loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LoadingIndicatorOverlay(props: Props) {
  const { loading } = props;
  return (
    <>
      {loading && (
        <div className="overlay">
          <div className="overlay__inner">
            <div className="overlay__content">
              <div className="lds-hourglass">
                {' '}
                <FormattedMessage {...messages.header} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(LoadingIndicatorOverlay);
