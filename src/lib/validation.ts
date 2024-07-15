export type Validation = {
  required?: { message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  include?: { value: string[]; message: string };
  exclude?: { value: string[]; message: string };
  type?: { value: "number"; message: string };
  minValue?: { value: number; message: string };
  maxValue?: { value: number; message: string };
  regex?: { value: RegExp; message: string };
};

export type Issue = {
  path: string;
  message: string;
};

export const validate = (value: string, validation: Validation) => {
  const { required, min, max, include, exclude, type, minValue, maxValue, regex } = validation;
  if (required && !value) return required.message;
  if (min && value.length < min.value) return min.message;
  if (max && value.length > max.value) return max.message;
  if (exclude && exclude.value.includes(value)) return exclude.message;
  if (include && !include.value.includes(value)) return include.message;
  if (type) {
    if (type.value === "number" && isNaN(Number(value))) return type.message;
  }
  if (minValue && !(Number(value) >= minValue.value)) return minValue.message;
  if (maxValue && !(Number(value) <= maxValue.value)) return maxValue.message;
  if (regex && !regex.value.test(value)) return regex.message;
  return "";
};

export const validateAll = <T extends { [key: string]: string }>(
  values: T,
  validations: { [key in keyof T]: Validation }
) => {
  return Object.keys(values).reduce((issues: Issue[], key: string) => {
    const issue = validate(values[key], validations[key]);
    return issue ? [...issues, { path: key, message: issue }] : issues;
  }, []);
};
