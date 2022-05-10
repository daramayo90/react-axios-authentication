import axios from '../api/axios';
import useAuth from './useAuth';

function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        // Allows to send cookies with our request
        // Secure cookie we never see inside in our js code
        // Axios can be sent to the endpoint we need it to
        const response = await axios.get('/refresh', {
            withCredentials: true 
        });

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);

            // Override the accessToken with the new one
            return { ...prev, accessToken: response.data.accessToken } 
        });

        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;