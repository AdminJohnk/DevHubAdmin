// import Login from '@/pages/GetStarted/Login';
import Register from '@/pages/Register';
import NotFound404 from '@/pages/NotFound404';
import DashBoard from '@/pages/DashBoard';
import User from '@/pages/User';
import Login from '@/pages/Login';
import MainLayout from '@/layouts/MainLayout';
import Post from './pages/Post';

export const privateRoutes = [
  {
    path: '/',
    element: <MainLayout Component={<DashBoard />} />
  },
  {
    path: '/admin/users',
    element: <MainLayout Component={<User />} />
  },
  {
    path: '/admin/posts',
    element: <MainLayout Component={<Post />} />
  },
  {
    path: '*',
    element: <NotFound404 />
  }
];

export const publicRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '*',
    element: <NotFound404 />
  }
];
