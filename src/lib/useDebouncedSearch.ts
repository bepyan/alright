import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import React, { useCallback } from 'react';

export default function useDebouncedSearch<TData>(
  queryKey: string,
  searchFunction: (searchTerm: string) => TData | Promise<TData>,
  debounceTime = 300,
) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const searchHandler = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
    }, debounceTime),
    [],
  );

  const query = useQuery(
    [queryKey, searchTerm],
    async () => {
      if (searchTerm) {
        return await searchFunction(searchTerm);
      }
      return null;
    },
    { enabled: !!searchTerm },
  );

  return {
    ...query,
    searchTerm,
    setSearchTerm,
    searchHandler,
  };
}
