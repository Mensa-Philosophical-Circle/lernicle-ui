import { useEffect, useRef } from 'react';

/**
 * Puts the cursor in a field that has just appeared on the owner's request,
 * such as the first box of a form they opened. Not for a page's first load.
 */
export function useFocusOnMount<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
}
