import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxios = (url, setData) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_MY_TOKEN,
      }
    }

    axios
      .request(options)
      .then(function (response) {
        setData(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        setError(error)
        setLoading(false)
      })
  }, [url, setData])

  return { loading, error, data: setData }
}

export default useAxios