/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';

const isObjEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
}

const useFecth = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldLoading, setShouldLoading] = useState(false);
  const urlRef = useRef(url);
  const optionsRef = useRef(options)

  useEffect(() => {
    if (!isObjEqual(url, urlRef.current)) {
      urlRef.current = url;
      setShouldLoading(!shouldLoading);
    };
    if (!isObjEqual(options, optionsRef.current)) {
      optionsRef.current = options;
      setShouldLoading(!shouldLoading);
    };
  }, [url, options])

  useEffect(() => {
    let wait = false;
    console.log('EFFECT', new Date().toLocaleString());
    setLoading(true);

    const fetchData = async () => {
      // let wait = false;
      await new Promise(r => setTimeout(r, 3000)); // impede que a função seja chamada diretamente

      try {
        const responseData = await fetch(urlRef.current, optionsRef.current);
        const jsonResult = await responseData.json();
        if (!wait) {
          setResult(jsonResult);
          setLoading(false);
        }
      } catch (err) {
        if (!wait) setLoading(false);
        throw err;
      }
    };

    fetchData();

    return () => {
      wait = true
    };

  }, [shouldLoading]);

  return [result, loading];
};

function Home() {
  const [postId, setPostId] = useState('');
  const [result, loading] = useFecth('https://jsonplaceholder.typicode.com/users/' + postId, {
    headers: {
      abc: '2000000',
    }
  });

  useEffect(() => {
    console.log('ID do user', postId);
  }, [postId])

  const handleClick = (id) => {
    setPostId(id);
  }

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
    )
  };

  return (
    <div>
      <h1>Olá Mundo</h1>
    </div>
  );
}

export default Home;
