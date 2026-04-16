// frontend/src/components/molecules/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
 

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      className="w-full p-2 border rounded-lg"
      placeholder="Search for products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;