import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem('plateShareTheme') || 'plateShareTheme'
    );

    const toggleTheme = () => {
        const newTheme = theme === 'plateShareTheme' ? 'plateShareDarkTheme' : 'plateShareTheme';
        setTheme(newTheme);
    };

    useEffect(() => {
        localStorage.setItem('plateShareTheme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
