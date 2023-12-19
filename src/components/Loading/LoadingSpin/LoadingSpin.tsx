import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { getTheme } from '@/util/theme';

interface ILoadingSpinProps {
  text: string;
}

const LoadingSpin: React.FC<ILoadingSpinProps> = ({ text }) => {
  const { themeColorSet } = getTheme();

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '40%',
        textAlign: 'center'
      }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
      <div className='mt-3'>
        <span
          style={{
            color: themeColorSet.colorText1
          }}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default LoadingSpin;
