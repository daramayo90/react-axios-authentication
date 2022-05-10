import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh(); // Get a new Refresh Access Token
            } 
            catch (err) {
                console.error(err);
            } 
            finally {
                isMounted && setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        // Clean-up function in useEffect
        return () => isMounted = false;

    }, []);

    useEffect(() => {
        console.log(`is loading: ${isLoading}`);
        console.log(`at: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading])

    return (
        <>
            {!persist 
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;