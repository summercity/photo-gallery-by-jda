import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: (
              <A href="https://www.linkedin.com/in/jan-dave-arce-30a39a9b/">
                Jan Dave Arce
              </A>
            ),
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
