import React, {useEffect} from "react";
import styles from "./Input.module.scss";
import cx from "classnames"
import useDebounce from "../../common/hooks/useDebounce.ts";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  className?: string;
  onChange: (val: string) => void;
  value?: string;
}


const Input = ({onChange, className, value, ...props}: InputProps) => {
  const [internalValue, debounceEvents] = useDebounce({
    externalValue: value as never,
    callback: onChange,
    delay: 200
  });

  useEffect(() => {
    debounceEvents.onChange(value as never);
  }, [value])

  return (
    <div className={cx(styles.wrapper, {[`${className}`]: className})}>
      <input
        type="text"
        onChange={(e) => debounceEvents.onChange(e.target.value)}
        value={internalValue}
        {...props}
      />
    </div>
  );
};

export default Input;
