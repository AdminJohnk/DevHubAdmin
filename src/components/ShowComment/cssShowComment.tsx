import styled from 'styled-components';
import { commonColor, custom_scrollBar } from '@/util/cssVariable';

const StyleTotal = styled.div`
  .ant-table-body {
    ${custom_scrollBar}
  }
  .btn-function {
    :hover {
      color: ${commonColor.colorBlue2};
      transition: 0.3s;
    }
  }
  .btn-refresh,
  .btn-plus {
    color: ${props => props.theme.colorText3};
    :hover {
      color: ${props => props.theme.colorText1};
      transition: 0.3s;
    }
  }
`;

export default StyleTotal;
