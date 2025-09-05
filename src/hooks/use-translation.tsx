
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

const translations = { en, es };

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') {
      setLanguage('es');
    }
  }, []);

  const t = (key: string, replacements?: { [key: string]: string }) => {
    const keys = key.split('.');
    let translation = translations[language] as any;
    for (const k of keys) {
      translation = translation?.[k];
      if (translation === undefined) {
        return key; // Return key if not found
      }
    }

    if (typeof translation === 'string' && replacements) {
        return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
            return acc.replace(`{${placeholder}}`, value);
        }, translation);
    }

    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: (lang) => setLanguage(lang as Language), t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
