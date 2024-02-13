import axios from "axios";
import UpdateSessionTokens from "./updateSession";


export default async function HandleExpiredTokens(sessionContext, error){
    if (error.response.status == 401 && (error.response.data["error"] == "Token expired")) {
        const newTokens = await RefreshTokenRequest(sessionContext.session?.refreshToken);
        UpdateSessionTokens(sessionContext, 
            newTokens["accessToken"],
            newTokens["refreshToken"])
        console.log(error.config.headers["Content-type"])
        const headers = {
            'Content-Type': error.config.headers["Content-type"],
            'Authorization': 'Bearer ' + newTokens["accessToken"],
        };
        if (error.config.method == "post") {
            return axios.post(error.config.url,
                error.config.data,
                {headers})
                .then((response) =>
                {
                    return response.data;
                }).catch(error => {
                    console.error(error);
                    throw error;
                })
    } else {
        return axios.get(error.config.url,
            {headers})
            .then((response) =>
            {
                return response.data;
            }).catch(error => {
                console.error(error);
                throw error;
            })
    }} else {
        throw error;
       }
}
function RefreshTokenRequest(refreshToken){
    const headers = {
        "Content-Type": "application/json"
    }
    const body = {
        "refreshToken": refreshToken
    }
    return axios.post("http://localhost:8080/user/refresh_token", body, {headers})
    .then((response) => {
        return response.data
    }).catch((error) => {
        return error
    })
}