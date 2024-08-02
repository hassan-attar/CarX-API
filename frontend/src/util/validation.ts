export const validateName = (value: string) => {
  const nameRegex = /^[a-z ,.'-]+$/i;
  return nameRegex.test(value);
};

export const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const validatePassword = (value: string) => {
  return value.length >= 8;
};
