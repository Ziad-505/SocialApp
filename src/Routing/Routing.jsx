import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout';
import { AppLogin } from '../pages/auth/Login/Login';
import Register from '../pages/auth/Register/Register';
import Posts from '../pages/Posts/Posts';
import NotFound from '../pages/NotFound/NotFound';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import PostDetails from '../pages/PostDetails/PostDetails';
import Profile from '../pages/Profile/Profile';

export const router = createBrowserRouter([{
    path: '/',
    element: <Layout/>,
    children:[
        {
            index: true,
            element: <ProtectedRoute><Posts/></ProtectedRoute>
        },
        {
            path: '/login',
            element: <AppLogin/>
        },
        {
            path: '/register',
            element: <Register/>
        },
        {
            path: '/postDetails/:id',
            element:<ProtectedRoute><PostDetails/></ProtectedRoute>
        },
        {
            path: '/profile',
            element:<ProtectedRoute><Profile/></ProtectedRoute>
        },
        {
            path: '*',
            element: <NotFound/>
        }
    ]
}])