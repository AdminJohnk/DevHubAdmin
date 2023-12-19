import styled from 'styled-components';
import { custom_scrollBar } from '@/util/cssVariable';
import { commonColor } from '@/util/cssVariable';

const StyleProvider = styled.div`
  .admin-user {
    min-height: calc(100vh - 5rem);
    height: fit-content;
    background-color: ${props => props.theme.colorBg1};
  }
  .ant-table-body {
    ${custom_scrollBar}
  }
  .btn-edit,
  .btn-delete,
  .btn-showComment {
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

export default StyleProvider;
