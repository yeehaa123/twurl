import { ADD_BOOKMARK } from '../constants/ActionTypes';

export function addBookmark(title, url) {
  return {
    type: ADD_BOOKMARK,
    title,
    url
  };
}
