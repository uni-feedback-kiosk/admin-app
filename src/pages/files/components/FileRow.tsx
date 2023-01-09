import styled from 'styled-components';
import colors from '../../../data/values/colors';

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  background: ${colors.green};
  border-radius: 0.5em;
  padding: 0.5em;
  color: ${colors.white};
`;
