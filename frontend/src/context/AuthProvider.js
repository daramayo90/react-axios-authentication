import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    // Boolean if we can trust this device or not
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;