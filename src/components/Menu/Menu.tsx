import {
  faHouse,
  faUser,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Layout, Avatar } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { getTheme } from '@/util/theme';
import getImageURL from '@/util/getImageURL';
import { useAppSelector } from '@/hooks/special';
import { useCurrentUserInfo } from '@/hooks/fetch';
import StyleProvider from './cssMenu';

const MenuMain = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy theme từ LocalStorage chuyển qua css
  useAppSelector(state => state.theme.changed);
  const { themeColorSet } = getTheme();

  const { currentUserInfo } = useCurrentUserInfo();
  const [key, setKey] = useState('');

  useEffect(() => {
    const path = location.pathname;
    const pathMap: Record<string, string> = {
      '/': '1',
      '/admin/users': '2',
      '/admin/posts': '3'
    };
    setKey(pathMap[path] ?? '');
  }, [location.pathname]);

  const [showMenu, setShowMenu] = useState(false);
  const isXsScreen = useMediaQuery({ maxWidth: 639 });
  useEffect(() => {
    if (isXsScreen) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [isXsScreen]);

  return (
    <StyleProvider theme={themeColorSet}>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={false}
        width={250}
        className={showMenu ? 'sider' : 'hidden'}
        style={{
          overflow: 'auto',
          height: 'calc(100vh - 5rem)',
          position: 'fixed',
          left: 0,
          top: 80,
          bottom: 0,
          zIndex: 1000
        }}>
        <div
          className='ps-6 py-4 flex flex-row'
          style={{
            backgroundColor: themeColorSet.colorBg2,
            height: '4.5rem'
          }}>
          <Avatar
            src={getImageURL(currentUserInfo?.user_image, 'avatar')}></Avatar>
          <div className='flex flex-col'>
            <span
              className='ml-2 font-semibold'
              style={{
                color: themeColorSet.colorText1
              }}>
              {currentUserInfo?.name}
            </span>
            <span
              className='ml-2 text-xs'
              style={{
                color: themeColorSet.colorText3
              }}>
              {currentUserInfo?.experiences[0]?.position_name}
            </span>
          </div>
        </div>
        <Menu
          mode='inline'
          selectedKeys={[key]}
          style={{
            borderInlineEnd: 'none',
            backgroundColor: themeColorSet.colorBg2,
            height: 'calc(100vh - 9.5rem)'
          }}
          items={[
            {
              key: '1',
              icon: <FontAwesomeIcon className='icon' icon={faHouse} />,
              label: 'Dashboard',
              title: '',
              onClick: () => {
                navigate('/');
                if (isXsScreen) setShowMenu(false);
              }
            },
            {
              key: '2',
              icon: <FontAwesomeIcon className='icon' icon={faUser} />,
              label: 'Users',
              title: '',
              onClick: () => {
                navigate('/admin/users');
                if (isXsScreen) setShowMenu(false);
              }
            },
            {
              key: '3',
              icon: <FontAwesomeIcon className='icon' icon={faNewspaper} />,
              label: 'Posts',
              title: '',
              onClick: () => {
                navigate('/admin/posts');
                if (isXsScreen) setShowMenu(false);
              }
            }
          ]}
        />
      </Layout.Sider>
    </StyleProvider>
  );
};

export default MenuMain;
