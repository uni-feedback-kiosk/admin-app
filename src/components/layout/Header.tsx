import styled from 'styled-components';
import { colors } from '../../constants';
import { clearToken } from '../../pages/login/authSlice';
import { useAppSelector, useAppDispatch } from '../../store/store';
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
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const logOut = () => dispatch(clearToken());

  return (
    <StyledHeader>
      <StyledAppName>Kiosk Admin App</StyledAppName>
      {token !== '' && <Button color="negative" onClick={logOut}>Log Out</Button>}
    </StyledHeader>
  );
};
