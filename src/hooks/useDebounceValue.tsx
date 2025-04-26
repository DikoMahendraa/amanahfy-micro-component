import { useEffect, useRef, useState } from "react";

export const useDebounceValue = (value: string, delay = 500) => {
  const [debValue, setDebValue] = useState(value);
  const mounted = useRef(true);

  useEffect(() => {
    if (mounted.current) {
      mounted.current = false;
      return;
    }

    const timer = setTimeout(() => setDebValue(value), delay);

    return () => clearTimeout(timer);
  }, [delay, value]);

  return debValue;
};

export default useDebounceValue;
