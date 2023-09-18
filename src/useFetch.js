import {useEffect, useState} from "react";

export function useFetch(url) {
  const [status, setStatus] = useState({
    data: null,
    loading: false,
    error: null
  });

  function fetching(option) {
    setStatus({loading: true});
    const result = option ? option : '';
    fetch(`${url}${result}`)
      .then((data) => data.json())
      .then(res => {
        setStatus({loading: false, data: res})
      })
      .catch(e => {
        setStatus({loading: false, error: e})
      })
  }

  function refetch(option) {
    fetching(option);
  }

  useEffect(() => {
    if (url) {
      fetching();
    }
  }, []);

  return {...status, refetch}
}