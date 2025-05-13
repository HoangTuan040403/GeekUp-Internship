import { Routes, Route } from 'react-router-dom';
import AlbumTable from './components/AlbumTable';
import AlbumDetail from './components/AlbumDetail';
import UserTable from './components/UserTable';
import UserDetail from './components/UserDetail';
import MainPage from './pages/MainPage';

export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<MainPage />}>
                <Route path="albums" element={<AlbumTable />} />
                <Route path="albums/:id" element={<AlbumDetail />} />
                <Route path="users" element={<UserTable />} />
                <Route path="users/:id" element={<UserDetail />} />
            </Route>
        </Routes>
    );
}
