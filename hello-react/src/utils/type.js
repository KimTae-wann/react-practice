const getType = (val) => Object.prototype.toString.call(val);

export const isString = (value) => {
  return getType(value).includes('String');
};

export const isNumber = (value) => {
  return getType(value).includes('Number');
};

export const isObject = (value) => {
  return getType(value).includes('Object');
};

export const isArray = (value) => {
  return getType(value).includes('Array');
};

export const isFunction = (value) => {
  return getType(value).includes('Function');
};
