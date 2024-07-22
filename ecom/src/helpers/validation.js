export const required = (value) =>
  value || (typeof value == "number" && value === 0)
    ? undefined
    : "This field is required";
export const number = (value) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
export const digit = (value) =>
  value && !/^[0-9]*$/.test(value) ? "Must be a number" : undefined;
const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} numbers` : undefined;
export const maxLengthMobileNo = maxLength(10);
export const maxLength20 = maxLength(20);
export const maxLength50 = maxLength(50);
export const maxLength1000 = maxLength(1000);
const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
  export const minLengthMobileNo = minLength(10);
export const minLength8 = minLength(8);
const maxValue = (max) => (value) =>
  value && value > max ? `Must be at least ${max} or less` : undefined;
export const maxValueMobile = maxValue(9999999999);
const minValue = (min) => (value) =>
  value !== undefined && value !== null && value !== "" && value < min
    ? `Must be at least ${min}`
    : undefined;
export const minValueMobile = minValue(9999999999);
export const minValue10 = minValue(10);
export const minValue0 = minValue(0);
export const email = (value) =>
  value && !/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i.test(value)
    ? "Invalid email address"
    : undefined;
export const name = (value) =>
  value && !/^[a-zA-Z\s]*$/i.test(value) ? "Invalid name" : undefined;
  export const passwordPattern = value => 
  value && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{}|:;"'<>,.?\\/]).{8,20}$/.test(value) ? "Password must be 8-20 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character." : undefined;