/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';

const isObjEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
}

export const useFecth = (url, options) => {
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
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log('EFFECT', new Date().toLocaleString());
    setLoading(true);

    const fetchData = async () => {
      // let wait = false;
      await new Promise(r => setTimeout(r, 3000)); // impede que a função seja chamada diretamente

      try {
        const responseData = await fetch(urlRef.current, { signal, ...optionsRef.current });
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
      wait = true;
      abortController.abort();
    };

  }, [shouldLoading]);

  return [result, loading];
};
