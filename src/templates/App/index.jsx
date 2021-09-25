/* eslint-disable */
import React, { useEffect, useState } from 'react';

const useFecth = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      // let wait = false;
      await new Promise(r => setTimeout(r, 3000)); // impede que a função seja chamada diretamente

      try {
        const responseData = await fetch(url, options);
        const jsonResult = await responseData.json();
        setResult(jsonResult);
        setLoading(false);
      } catch (err) {
        throw err;
      }
    };

    fetchData();

  }, [url]);

  return [result, loading];
};

function Home() {
  const [result, loading] = useFecth('https://jsonplaceholder.typicode.com/users');

  if (loading) return <h1>Loading...</h1>;
  if (!loading && result) console.log(result);

  return (
    <div>
      <h1>Olá Mundo</h1>
    </div>
  );
}

export default Home;
