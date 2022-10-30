import * as React from 'react';
import LogoSukanify from './../assets/images/logo-sukanify.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from '../store/auth-slice';
import axios from 'axios';
import { profileActions } from '../store/profile-slice';
import { playlistActions } from '../store/playlist-slice';
import { playerActions } from '../store/player-slice';
import { albumActions } from '../store/album-slice';

function Navbar() {

    useEffect(() => {
        const hash = window.location.hash;
        let token: string | null | undefined = window.localStorage.getItem("sukanifyred-token");

        if (token) {
            dispatch(authActions.login());
        } else {
            if (hash) {
                token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1];
                if (token) {
                    window.location.hash = "";
                    window.localStorage.setItem("sukanifyred-token", token);
                    dispatch(authActions.login());
                    getProfile(token);
                    getPlaylist(token);
                    getPlayer(token);
                    getAlbum(token);
                }
            }
        }
    }, []);


    const CLIENT_ID = 'ce199107b62744f3b0fee019f8fbeee0';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    const SCOPE = 'user-read-playback-state';
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const profileData = useSelector((state: any) => state.profile.profile);
    const dispatch = useDispatch();
    const logout = () => {
        window.localStorage.removeItem("sukanifyred-token");
        dispatch(authActions.logout());
    }

    const getProfile = async (token: string) => {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(profileActions.setProfile(data));
    }

    const getPlaylist = async (token: string) => {
        const { data } = await axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(playlistActions.setPlaylist(data));
    }

    const getPlayer = async (token: string) => {
        const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(playerActions.setPlayer(data));
    }

    const getAlbum = async (token: string) => {
        const { data } = await axios.get("https://api.spotify.com/v1/browse/new-releases?limit=6", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(albumActions.setAlbum(data));
    }

    return (
        <div className='bg-[#1A1414] w-full px-6 py-3 flex justify-between items-center'>
            <a href='/' className='flex items-center'>
                <img src={LogoSukanify} width="30" alt="sukanify-logo"/>
                <div className='text-xl font-bold text-[#EE4036]'>Sukanify Red</div>
            </a>
            <div>
                {isLoggedIn ? <button className='flex items-center'>
                    <div onClick={logout}>Logout</div> 
                    <img src={profileData?.images[0]?.url} alt="profile-image" className='rounded-full w-7 ml-4'/>
                    </button> :
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
                        <button>
                            Login
                        </button>
                    </a>}
            </div>
        </div>
    );
}
export default Navbar;
