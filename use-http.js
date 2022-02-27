import React, { useState, useCallback } from 'react';


const UseHttp = () => {


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const sendRequest =   useCallback(async(requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
            headers: requestConfig.headers ? requestConfig.headers : {},
            method: requestConfig.method ? requestConfig.method : 'GET',
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
      isLoading,
      error,
      sendRequest

  }


};
export default UseHttp;