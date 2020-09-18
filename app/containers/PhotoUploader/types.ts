import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* --- STATE --- */
interface PhotoUploaderState {
  readonly default: any;
}

/* --- ACTIONS --- */
type PhotoUploaderActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type ContainerState = PhotoUploaderState;
type ContainerActions = PhotoUploaderActions;

export { ContainerState, ContainerActions };
