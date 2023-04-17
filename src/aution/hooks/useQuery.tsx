import { useState } from 'react';

export const useQuery = (key: string) => {
  const [value, setValue] = useState(new URL(location.href).searchParams.get(key) ?? undefined);
  return {
    value,
    setValue: (value: string) => {
      const url = new URL(location.href);
      url.searchParams.set(key, value);
      history.pushState({}, '', url.href);
      setValue(value);
    },
  };
};
