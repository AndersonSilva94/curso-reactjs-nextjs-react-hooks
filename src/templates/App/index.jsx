import React, { useEffect, useState } from 'react';
import useAsync from './use-async';

const fetchData = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/users/');
  const json = await data.json();
  return json;
};

function Home() {
  const [posts, setPosts] = useState(null);
  const [reFetchData, result, error, status] = useAsync(fetchData, true);

  if (status === 'idle') {
    return <pre>Nada executando</pre>;
  }
  if (status === 'pending') {
    return <pre>Loading...</pre>;
  }
  if (status === 'error') {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }
  if (status === 'settled') {
    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  }
  return 'IXIII';
}

export default Home;
