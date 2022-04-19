import { useEffect, useState } from "react";

export default function useDebounce(initialalizeValue = "", delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(initialalizeValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initialalizeValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, initialalizeValue]);
  return debounceValue;
}
