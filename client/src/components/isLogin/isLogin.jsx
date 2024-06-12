import { createContext, useState, useEffect } from 'react';

export const authContext = createContext();
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(localStorage.getItem('auth') === 'true');
    useEffect(() => {
        localStorage.setItem('auth', auth);
    }, [auth]);
    return (
        <authContext.Provider value={[ auth, setAuth ]}>
            {children}
        </authContext.Provider>
    );
};