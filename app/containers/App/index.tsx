/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import styled from 'styles/styled-components';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { createStructuredSelector } from 'reselect';

// import PhotoUploader from 'containers/PhotoUploader/Loadable';
import Gallery from 'containers/Gallery';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';
import LoadingIndicatorOverlay from 'components/LoadingIndicatorOverlay';
import { makeSelectLoading, makeSelectError } from './selectors';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const stateSelector = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function App() {
  const { loading, error } = useSelector(stateSelector);
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s -Just another app by JDA"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="Photo Gallery by - JDA" />
      </Helmet>
      <LoadingIndicatorOverlay loading={loading} />
      <Switch>
        <Route exact path="/" component={Gallery} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
export default hot(App);
