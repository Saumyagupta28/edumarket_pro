import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const mockSuggestions = [
    "React Development",
    "JavaScript Fundamentals",
    "Python Programming",
    "Web Design",
    "Data Science",
    "Machine Learning",
    "Digital Marketing",
    "Photography Basics"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <Input
            type="search"
            placeholder="Search for courses, instructors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 w-full bg-surface border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-base"
          />
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-elevation-4 z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-surface-secondary transition-colors duration-150 flex items-center space-x-3 first:rounded-t-xl last:rounded-b-xl"
            >
              <Icon name="Search" size={16} className="text-text-tertiary" />
              <span className="text-text-primary">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;