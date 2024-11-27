// SearchBar.tsx
import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Buscar por nombre o documento..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
