import { useRef, useState } from "react";
import useTimeout from "./useTimeout";

// Define the shape of the debounceConfig prop
interface DebounceConfig {
  externalValue: string;
  callback: (value: string) => void;
  delay: number;
}

// Define the return type of the hook
type UseDebounceReturn = [string, { onChange: (value: string) => void }];

const useDebounce = ({ externalValue, callback, delay }: DebounceConfig): UseDebounceReturn => {
  const initialRender = useRef(true);

  const [internalValue, setInternalValue] = useState<string>(externalValue || "");

  // Use the useTimeout hook with the debounced logic
  useTimeout(() => {
    if (!initialRender.current) {
      callback(internalValue); // Trigger the callback with the debounced value
    }
    initialRender.current = false;
  }, [internalValue], delay);

  const events = {
    onChange: (value: string) => setInternalValue(value),
  };

  return [internalValue, events];
};

export default useDebounce;
