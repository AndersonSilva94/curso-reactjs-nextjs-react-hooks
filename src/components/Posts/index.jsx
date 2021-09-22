import React, { useContext, useEffect, useRef } from 'react';
import { loadPosts } from '../../contexts/PostsContext/actions';
import PostsContext from '../../contexts/PostsContext/context';

const Posts = () => {
  const isMounted = useRef(true);
  const postsContext = useContext(PostsContext);
  // console.log(postsContext);
  const { postsState, postsDispatch } = postsContext;

  console.log(isMounted.current);

  useEffect(() => {
    loadPosts(postsDispatch).then((dispatch) => {
      if (isMounted.current) {
        dispatch();
      }
    });
    return () => {
      isMounted.current = false;
      console.log(isMounted.current);
    };
  }, [postsDispatch]);

  return (
    <div>
      <h1>POSTS</h1>
      {postsState.loading && (
        <p>
          <strong>Carregando posts...</strong>
        </p>
      )}
      {postsState.posts.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
};

export default Posts;
