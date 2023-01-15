import styled, { css } from 'styled-components';
import colors from '../../constants';

interface ButtonProps {
  color?: 'negative' | 'positive';
  size?: 'small' | 'normal';
}

const buttonFontSize = css<ButtonProps>`
  font-size: ${({ size }) => (size === 'small') ? '0.8em' : '1em'};
`;

const buttonPadding = css<ButtonProps>`
  padding: 0.5em ${({ size }) => (size === 'small') ? '0.8em' : '1.5em'};
`;

const buttonColor = css<ButtonProps>`
  background-color: ${({ color }) => (color === 'negative') ? colors.orange : colors.green};
  
  &:enabled:active {
    background-color: ${({ color }) => (color === 'negative') ? colors.orange_active : colors.green_active};
  }
`;

export default styled.button<ButtonProps>`
  color: white;
  border-radius: 0.3em;
  border: none;
  cursor: pointer;
  ${buttonFontSize}
  ${buttonPadding}
  ${buttonColor}

  &:disabled {
    cursor: default;
    background-color: ${colors.dark_grey};
    color: ${colors.grey};
  }
`;
