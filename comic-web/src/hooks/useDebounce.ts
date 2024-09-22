import { useEffect, useState } from "react";

const useDebounce = <T = string>(defaultValue: T, delay: number = 300) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, value, setValue };
};

export default useDebounce;
