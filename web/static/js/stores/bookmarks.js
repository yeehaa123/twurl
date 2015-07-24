import { ADD_BOOKMARK } from '../constants/ActionTypes';

const collection = [];

export default function bookmark(state = collection, action) {
  switch (action.type) {
  case ADD_BOOKMARK:
    const { title, url } = action;
    if(title && url){
    return [{
      id: (state.length === 0) ? 0 : state[0].id + 1,
      title: action.title,
      url: action.url
    }, ...state];}
    return state;
  default:
    return state;
  }
}
