export type Validation = {
  required?: {
    message: string;
  };
  min?: {
    value: number;
    message: string;
  };
  max?: {
    value: number;
    message: string;
  };
  include?: {
    value: string[];
    message: string;
  };
  exclude?: {
    value: string[];
    message: string;
  };
  type?: {
    value: "number";
    message: string;
  };
  minValue?: {
    value: number;
    message: string;
  };
  maxValue?: {
    value: number;
    message: string;
  };
  regex?: {
    value: RegExp;
    message: string;
  };
};

export const validate = (value: string, validation: Validation) => {
  if (validation.required && !value) {
    return validation.required.message;
  }
  if (validation.min && value.length < validation.min.value) {
    return validation.min.message;
  }
  if (validation.max && value.length > validation.max.value) {
    return validation.max.message;
  }
  if (validation.exclude) {
    if (validation.exclude.value.includes(value)) return validation.exclude.message;
  }
  if (validation.include) {
    if (!validation.include.value.includes(value)) return validation.include.message;
  }
  if (validation.type) {
    if (validation.type.value === "number") {
      if (isNaN(Number(value))) return validation.type.message;
    }
  }
  if (validation.minValue) {
    if (!(Number(value) >= validation.minValue.value)) return validation.minValue.message;
  }
  if (validation.maxValue) {
    if (!(Number(value) <= validation.maxValue.value)) return validation.maxValue.message;
  }
  if (validation.regex) {
    if (!validation.regex.value.test(value)) return validation.regex.message;
  }
  return "";
};
