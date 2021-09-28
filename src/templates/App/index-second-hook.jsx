import { useEffect, useState } from 'react';
import { useFecth } from './use-fetch';

function Home() {
  const [postId, setPostId] = useState('');
  const [result, loading] = useFecth('https://jsonplaceholder.typicode.com/users/' + postId, {
    headers: {
      abc: '2000000',
    },
  });

  useEffect(() => {
    console.log('ID do user', postId);
  }, [postId]);

  const handleClick = (id) => {
    setPostId(id);
  };

  if (loading) return <h1>Loading...</h1>;
  if (!loading && result) {
    return (
      <div>
        {result?.length > 0 ? (
          result.map((elem) => (
            <div key={`user-${elem.id}`} onClick={() => handleClick(elem.id)}>
              <p>{elem.name}</p>
            </div>
          ))
        ) : (
          <div onClick={() => handleClick('')}>
            <p>{result.name}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>Olá Mundo</h1>
    </div>
  );
}

export default Home;
