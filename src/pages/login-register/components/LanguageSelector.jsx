import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSelector = ({ currentLanguage = 'en', onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.name}</span>
        <Icon name="ChevronDown" size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-surface border border-border rounded-lg shadow-elevation-4 z-50 animate-slide-down">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-surface-secondary transition-colors duration-150 ${
                  currentLanguage === language.code ? 'bg-primary-50 text-primary' : 'text-text-primary'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium">{language.name}</span>
                {currentLanguage === language.code && (
                  <Icon name="Check" size={16} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;