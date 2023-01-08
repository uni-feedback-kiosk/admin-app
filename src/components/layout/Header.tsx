import { useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../contexts/AuthContext';
import colors from '../../data/values/colors';
import Button from '../ui/Button';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  padding: 0 3em;
  justify-content: space-between;
  align-items: center;
  background: ${colors.green};
  color: ${colors.white};
`;

const StyledAppName = styled.h1`
  margin: 0;
  font-weight: 500;
  font-size: 1.5em;
`;

export default () => {
  const { token, setToken } = useContext(AuthContext);

  const logOut = () => setToken(null);

  return (
    <StyledHeader>
      <StyledAppName>Kiosk Admin App</StyledAppName>
      {token !== null && <Button color="negative" onClick={logOut}>Log Out</Button>}
    </StyledHeader>
  );
};
