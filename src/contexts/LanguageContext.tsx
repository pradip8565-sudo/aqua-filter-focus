
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'gu' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  gu: {
    // Header
    'app.title': 'એક્વાપ્યોર હોલસેલ',
    'app.subtitle': 'આરઓ ફિલ્ટર હોલસેલ બિઝનેસ મેનેજમેન્ટ',
    'quick.order': 'ઝડપી ઓર્ડર',
    
    // Navigation
    'nav.dashboard': 'ડેશબોર્ડ',
    'nav.inventory': 'ઇન્વેન્ટરી',
    'nav.customers': 'ગ્રાહકો',
    'nav.orders': 'ઓર્ડર',
    'nav.suppliers': 'સપ્લાયર',
    'nav.analytics': 'વિશ્લેષણ',
    
    // Business Overview
    'metrics.monthly.income': 'માસિક આવક',
    'metrics.active.orders': 'સક્રિય ઓર્ડર',
    'metrics.total.customers': 'કુલ ગ્રાહકો',
    'metrics.inventory.items': 'ઇન્વેન્ટરી આઇટમ',
    'recent.orders': 'તાજેતરના ઓર્ડર',
    'recent.orders.desc': 'નવીનતમ ગ્રાહક ઓર્ડર અને તેમની સ્થિતિ',
    'low.stock.alert': 'ઓછા સ્ટોકની ચેતવણી',
    'low.stock.desc': 'ઇન્વેન્ટરીમાં ઓછા સ્ટોક વાળા આઇટમ',
    
    // Status
    'status.processing': 'પ્રોસેસિંગ',
    'status.shipped': 'મોકલાયેલ',
    'status.delivered': 'પહોંચાડેલ',
    'status.pending': 'બાકી',
    'status.low.stock': 'ઓછો સ્ટોક',
    
    // Language
    'language.gujarati': 'ગુજરાતી',
    'language.english': 'English'
  },
  en: {
    // Header
    'app.title': 'AquaPure Wholesale',
    'app.subtitle': 'RO Filter Wholesale Business Management',
    'quick.order': 'Quick Order',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.inventory': 'Inventory',
    'nav.customers': 'Customers',
    'nav.orders': 'Orders',
    'nav.suppliers': 'Suppliers',
    'nav.analytics': 'Analytics',
    
    // Business Overview
    'metrics.monthly.income': 'Monthly Income',
    'metrics.active.orders': 'Active Orders',
    'metrics.total.customers': 'Total Customers',
    'metrics.inventory.items': 'Inventory Items',
    'recent.orders': 'Recent Orders',
    'recent.orders.desc': 'Latest customer orders and their status',
    'low.stock.alert': 'Low Stock Alert',
    'low.stock.desc': 'Items with low stock in inventory',
    
    // Status
    'status.processing': 'Processing',
    'status.shipped': 'Shipped',
    'status.delivered': 'Delivered',
    'status.pending': 'Pending',
    'status.low.stock': 'Low Stock',
    
    // Language
    'language.gujarati': 'ગુજરાતી',
    'language.english': 'English'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('gu');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language') as Language;
    if (savedLanguage && (savedLanguage === 'gu' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
