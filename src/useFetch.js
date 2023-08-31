import {useEffect, useState} from "react";

export function useFetch(url) {
  const [status, setStatus] = useState({
    data: null,
    loading: false,
    error: null
  });

  function fetching() {
    setStatus({loading: true})
    fetch(url)
      .then((data) => data.json())
      .then(res => {
        setStatus({loading: false, data: res})
      })
      .catch(e => {
        setStatus({loading: false, error: e})
      })
  }

  function refetch(option) {
    fetch(`${url}${option}`)
      .then((data) => data.json())
      .then(res => {
        setStatus({loading: false, data: res})
      })
      .catch(e => {
        setStatus({loading: false, error: e})
      })
  }

  useEffect(() => {
    if (url) {
      fetching();
    }
  }, []);

  return {...status, refetch}
}