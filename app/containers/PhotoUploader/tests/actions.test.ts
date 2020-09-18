import { action } from 'typesafe-actions';

import { defaultAction } from '../actions';
import ActionTypes from '../constants';

describe('PhotoUploader actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = action(ActionTypes.DEFAULT_ACTION);
      expect(defaultAction()).toEqual(expected);
    });
  });
});
