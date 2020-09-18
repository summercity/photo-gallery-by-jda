/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */

enum ActionTypes {
  LOAD_REPOS = 'jda/App/LOAD_REPOS',
  LOAD_REPOS_SUCCESS = 'jda/App/LOAD_REPOS_SUCCESS',
  LOAD_REPOS_ERROR = 'jda/App/LOAD_REPOS_ERROR',
  SET_APP_LOADING = 'jda/App/SET_APP_LOADING',
}
export const API_BASE_URL = 'http://18.220.219.235:8888'; // TODO: move to env
export default ActionTypes;
