import { KeyboardEvent } from 'react';

export default (keys: string[]) => (
  (callback: () => void) => (
    (e: KeyboardEvent) => {
      if (!keys.includes(e.key)) {
        return;
      }

      callback();
    }
  )
);
