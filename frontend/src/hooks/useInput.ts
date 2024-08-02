import { FormEvent, useState } from "react";

export function useInput(
  defaultValue: any,
  validateValue: (value: string) => boolean
) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  function handleInputChange(event: FormEvent<HTMLInputElement>) {
    setEnteredValue(event.currentTarget.value);
    setIsValid(validateValue(event.currentTarget.value));
    setIsTouched(false);
  }

  function handleInputBlur() {
    setIsTouched(true);
    setIsValid(validateValue(enteredValue));
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    isValid,
    isTouched,
  };
}
