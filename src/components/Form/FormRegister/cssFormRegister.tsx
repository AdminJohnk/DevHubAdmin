import styled from 'styled-components';

const StyleProvider = styled.div`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${props => props.theme.colorText1};
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px ${props => props.theme.colorBg2};
  }
`;

export default StyleProvider;
