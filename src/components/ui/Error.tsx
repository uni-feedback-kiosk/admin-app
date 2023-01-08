import styled from 'styled-components';
import colors from '../../data/values/colors';
import FadeIn from '../animation/FadeIn';

export default styled.div`
  border: 0.1em solid ${colors.orange};
  border-radius: 0.35em;
  color: ${colors.orange};
  min-height: 1.2em;
  line-height: 1.2;
  text-align: center;
  position: absolute;
  padding: 1em;
  background: #ffeeee;
  top: 1em;
  margin: auto;
  animation-name: ${FadeIn};
  animation-duration: 0.3s;
`;
