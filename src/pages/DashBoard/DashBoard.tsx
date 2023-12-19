import { getTheme } from '@/util/theme';
import { useAppSelector } from '@/hooks/special';
import StyleProvider from './cssDashBoard';

const DashBoard = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  useAppSelector((state) => state.theme.changed);
  const { themeColorSet } = getTheme();
  return (
    <StyleProvider theme={themeColorSet}>
      <div className='dashBoardWrap'>
        <div id='dashBoard'>
          <div className='dashBoard'>
            <div className='dashBoard-content'>
              <h1>Dashboard Admin</h1>
              {/* <h2>Dashboard Admin</h2> */}
            </div>
            {/* <NavLink to='/'>Homepage</NavLink> */}
          </div>
        </div>
      </div>
    </StyleProvider>
  );
};

export default DashBoard;
