import styled from 'styled-components'
export const RestartButtonWrapper = styled.div`
  :hover {
    opacity: 0.8;
    transition: width 3s linear 1s;
    transform: rotateY(20deg);
  }

  button {
    font-size: 0.8rem;
    width: 150%;
    height: 50px;
    margin: 5px 0;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`
