import styled from 'styled-components';

const StyleProvider = styled.div`
  .dashBoardWrap {
    * {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    #dashBoard {
      position: relative;
      height: calc(100vh - 5rem);
      background: ${props => props.theme.colorBg1};
    }

    #dashBoard .dashBoard {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }

    .dashBoard {
      max-width: 767px;
      width: 100%;
      line-height: 1.4;
      text-align: center;
    }

    .dashBoard .dashBoard-content {
      position: relative;
      height: 180px;
      margin-bottom: 20px;
      z-index: -1;
    }

    .dashBoard .dashBoard-content h1 {
      font-family: 'Montserrat', sans-serif;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      font-size: 150px;
      font-weight: 900;
      margin-top: 0px;
      margin-bottom: 0px;
      margin-left: -12px;
      color: ${props => props.theme.colorBg1};
      text-transform: uppercase;
      text-shadow: -1px -1px 0px #8400ff, 1px 1px 0px #ff005a;
      letter-spacing: -20px;
    }

    .dashBoard .dashBoard-content h2 {
      font-family: 'Montserrat', sans-serif;
      position: absolute;
      left: 0;
      right: 0;
      top: 110px;
      font-size: 42px;
      font-weight: 700;
      color: ${props => props.theme.colorText1};
      text-transform: uppercase;
      text-shadow: 0px 2px 0px #8400ff;
      letter-spacing: 13px;
      margin: 0;
    }
  }
`;

export default StyleProvider;
