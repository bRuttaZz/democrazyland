
export function watchObject(target, onChange) {
  return new Proxy(target, {
    set(obj, key, value) {
      const old = obj[key];
      obj[key] = value;
      if (old !== value) onChange(obj, key, value, old);
      return true;
    },
  });
}
