
import React, { useEffect, useState } from 'react'

export const useDebounce = (path) => {
  // 'мягкая'
  const [debounceValue, setDebounceValue] = useState(path);

  // console.log({ path });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(path)
    }, 400);

    // обращается к предыдущему таймауту
    return () => clearTimeout(timeout)
  }, [path])

  return debounceValue
}