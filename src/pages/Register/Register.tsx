import { ConfigProvider } from 'antd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@/hooks/special';
import StyleProvider from './cssRegister';
import { getTheme } from '@/util/theme';
import FormRegister from '../../components/Form/FormRegister/FormRegister';

const Register = () => {
  useAppSelector(state => state.theme.changed);
  const { themeColorSet } = getTheme();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextBase: themeColorSet.colorText2,
          colorBgBase: themeColorSet.colorBg2,
          lineWidth: 0,
          controlHeight: 40
        }
      }}>
      <StyleProvider theme={themeColorSet} className='w-screen h-screen'>
        <div className='register relative'>
          <div className='cover absolute top-0 left-0'>
            <div className='content'>
              <div className='lineTop mt-5'>
                <span className='anyWhere'>
                  <span className='circle ml-5 mr-2'>
                    <FontAwesomeIcon className='icon' icon={faSnowflake} />
                  </span>
                  <span>DevHub</span>
                </span>
              </div>
              <div className='account mt-12 px-14'>
                <div className='startFree'>START FOR FREE</div>
                <div className='createAccount'>Create new account</div>
                <div className='member mt-3'>
                  <span className='memberEd'>Already a member?</span>
                  <NavLink to='/login'>
                    <span className='login ml-1'>Login</span>
                  </NavLink>
                </div>
                <FormRegister />
              </div>
            </div>
          </div>
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default Register;
