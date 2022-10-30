import { useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/navbar.tsx';
import Profile from './components/profile.tsx';
import Card from './components/card.tsx';

function App() {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const playlist = useSelector(state => state.playlist.playlist);
    const album = useSelector(state => state.album.album);

    return (
        <div>
            <Navbar />
            {isLoggedIn && <Profile />}
            {isLoggedIn && playlist?.items?.length > 0 && <div className='m-8'>
                <div className='font-semibold text-lg'>
                    Playlists
                </div>
                {playlist?.items.map((item, key) => <Card item={item} key={key} />)}
            </div>}
            {isLoggedIn && album?.albums?.items?.length > 0 && <div className='m-8'>
                <div className='font-semibold text-lg'>
                    New Release
                </div>
                <div className='flex flex-wrap'>
                    {album?.albums?.items.map((item, key) => <Card item={item} key={key} />)}
                </div>
            </div>}
        </div>
    );
}

export default App;
