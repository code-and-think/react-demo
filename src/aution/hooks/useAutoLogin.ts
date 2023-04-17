import { useLocalStorageState, useSessionStorageState } from 'ahooks';

const key = 'user.autoLogin';
export default function useAutoLogin() {
  const [session, setSession] = useSessionStorageState(key, {
    defaultValue: '',
  });
  const [local, setLocal] = useLocalStorageState(key, {
    defaultValue: '',
  });

  return [
    session || local,
    (newValue: string, storage?: Storage) => {
      if (storage) {
        (storage === localStorage ? setLocal : setSession)(newValue);
      } else {
        setLocal(newValue);
        setSession(newValue);
      }
    },
  ] as const;
}
