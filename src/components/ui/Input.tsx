import styled from 'styled-components';
import { colors } from '../../constants';

export default styled.input`
  padding: 0.5em;
  border: 2px solid ${colors.grey};
  border-radius: 0.35em;
  background: ${colors.white};
  width: 100%;
  box-sizing: border-box;
  font-size: 1em;
  &:focus {
    border: 0.1em solid ${colors.dark_grey};
    outline: none;
  }
`;
