const isObject = (value: unknown) => Object.prototype.toString.call(value) === "[object Object]";


const fillMissingPropsWithDefaults = (targetObject: any, defaultProps: any) => {
  const requiredKeys = Object.keys(defaultProps);

  requiredKeys.forEach(key => {
    if (isObject(targetObject[key])) {
      return fillMissingPropsWithDefaults(targetObject[key], defaultProps[key]);
    }
    if (targetObject[key] === undefined) {
      targetObject[key] = defaultProps[key];
    }
  });

  return targetObject;
};

export {isObject, fillMissingPropsWithDefaults}
