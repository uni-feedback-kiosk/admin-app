import styled, { css } from 'styled-components';
import { colors } from '../../constants';
import FadeIn from '../animation/FadeIn';

interface NotificationProps {
  type?: 'info' | 'error' | 'success';
}

const notificationColor = ({ type }: NotificationProps) => {
  const color = {
    info: colors.blue,
    error: colors.orange,
    success: colors.green,
  }[type || 'info'];

  return css`
    color: ${color};
    border-color: ${color};
    background: linear-gradient(${color}, ${color});
    background-color: #fffa;
    background-blend-mode: color;
  `;
};

export default styled.div<NotificationProps>`
  border: 0.1em solid;
  border-radius: 0.35em;
  min-height: 1.2em;
  line-height: 1.2;
  text-align: center;
  position: absolute;
  padding: 1em;
  top: 1em;
  margin: auto;
  animation-name: ${FadeIn};
  animation-duration: 0.3s;
  ${notificationColor}
`;
