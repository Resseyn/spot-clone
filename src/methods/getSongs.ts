import axios from "axios";
import { useSessionContext } from "../hooks/useSession";
import HandleExpiredTokens from "./refreshToken";

export const GetSongDetails = async (sessionContext) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionContext.session.accessToken,
        };
        const response = await axios.get('http://localhost:8080/songs/all', { headers });
        return response.data;
    } catch (error) {
        return HandleExpiredTokens(sessionContext, error)
    }
}