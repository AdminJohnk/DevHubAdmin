import { CommunityWrapper, PostWrapper, ProfileWrapper } from '@/Wrapper';

import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { ForgotPassword, ResetPassword, VerifyCode } from '@/pages/ForgotPassword';
import NewsFeed from '@/pages/NewsFeed/NewsFeed';
import Chat from '@/pages/Chat';
import SelectInterest from '@/pages/SelectInterest';
import SelectFollow from '@/pages/SelectFollow';
import SelectCommunity from '@/pages/SelectCommunity';
import GetStarted from '@/pages/GetStarted';
import NotFound404 from '@/pages/NotFound404';
import DashBoard from '@/pages/DashBoard';
import User from '@/pages/User';
import Comment from '@/pages/Comment';

import { VoiceCall, VideoCall } from '@/components/ChatComponents/MessageCall';

import MainLayout from '@/layouts/MainLayout';
import Post from './pages/Post';

export const privateRoutes = [
  {
    path: '/dashboard',
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
    path: '/admin/comments',
    element: <MainLayout Component={<Comment />} />
  },
  {
    path: '/admin/conversations',
    element: <MainLayout Component={<User />} />
  },
  {
    path: '/admin/communities',
    element: <MainLayout Component={<User />} />
  },
  {
    path: '/admin/images',
    element: <MainLayout Component={<User />} />
  },
  {
    path: '/',
    element: <MainLayout Component={<NewsFeed />} />
  },
  {
    path: '/message/:conversationID?',
    element: <Chat />
  },
  {
    path: '/select-interest',
    element: <SelectInterest />
  },
  {
    path: '/select-follow',
    element: <SelectFollow />
  },
  {
    path: '/select-community',
    element: <SelectCommunity />
  },
  {
    path: '/get-started',
    element: <GetStarted />
  },
  {
    path: '/user/:userID',
    element: <MainLayout Component={<ProfileWrapper />} />
  },
  {
    path: '/me',
    element: <MainLayout Component={<ProfileWrapper />} />
  },
  {
    path: '/post/:postID',
    element: <MainLayout Component={<PostWrapper />} />
  },
  {
    path: '/community/:communityID',
    element: <MainLayout Component={<CommunityWrapper />} />
  },
  {
    path: '/call/:conversationID?/voice',
    element: <VoiceCall />
  },
  {
    path: '/call/:conversationID?/video',
    element: <VideoCall />
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
    path: '/forgot',
    element: <ForgotPassword />
  },
  {
    path: '/verify',
    element: <VerifyCode />
  },
  {
    path: '/reset',
    element: <ResetPassword />
  },
  {
    path: '*',
    element: <NotFound404 />
  }
];
