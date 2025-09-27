import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Basicamente ele atrasa a atualização de um valor até que ele
 * pare de mudar por um tempo. Criei por causa da busca de personagens,
 * pois evita que a requisição seja disparada a cada letra
 * Exemplo: se o delay for 500ms, só vai atualizar 500ms depois
 * da última digitação.
 */
