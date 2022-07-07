import * as types from './types';
export const loadPosts = async (dispatch) => {
  dispatch({ type: types.POSTS_LOADING });
  const postsRaw = await fetch('http://jsonplaceholder.typicode.com/posts');
  const posts = await postsRaw.json();
  return () => dispatch({ type: types.POSTS_SUCCESS, payload: posts });
};
