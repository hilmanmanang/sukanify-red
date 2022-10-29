import React, { useEffect, useState } from "react";
import axios from 'axios';

interface Props { }

function Login(props: Props) {
    const { } = props
    const CLIENT_ID = 'ce199107b62744f3b0fee019f8fbeee0';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    const [token, setToken] = useState("");
    const [userProfile, setUserProfile] = useState<any>({});
    useEffect(() => {
        const hash = window.location.hash;
        let token: string | null | undefined = window.localStorage.getItem("sukanifyred-token");

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1];
            if (token) {
                window.location.hash = "";
                window.localStorage.setItem("sukanifyred-token", token);
                setToken(token);
                profile(token);
            }
        }
        console.log(hash)
        console.log(token)
    }, []);

    const profile = async (token: string) => {
        console.log(token)
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        setUserProfile(data)
    }

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("sukanifyred-token");
    }

    return (
        <>
            {!token && <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                <button className="bg-[#EE4036] text-[#1A1414] font-semibold text-lg rounded px-6 py-1">Login</button>
            </a>}
            {token && <button onClick={logout} className="bg-[#EE4036] text-[#1A1414] font-semibold text-lg rounded px-6 py-1">Logout</button>}
            {token && userProfile && `Welcome ${userProfile.display_name}`}
        </>
    )
}

export default Login
