/*
 * Gallery Messages
 *
 * This contains all the text for the Gallery container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Gallery';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Gallery container!',
  },
});
