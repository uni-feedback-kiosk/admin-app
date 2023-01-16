import styled, { css } from 'styled-components';
import { colors } from '../../constants';

interface ButtonProps {
  color?: 'negative' | 'positive';
  size?: 'small' | 'normal';
  icon?: string
}

const buttonIcon = ({ icon }: ButtonProps) => icon ? css`
  ::before {
    mask: url(${icon}) no-repeat center / contain;
    margin-right: 0.3em;
    margin-left: -0.4em;
    vertical-align: bottom;
    display: inline-block;
    content: '';
    width: 1.1em;
    height: 1.1em;
  }
` : '';

const buttonFontSize = css<ButtonProps>`
  font-size: ${({ size }) => (size === 'small') ? '0.8em' : '1em'};
`;

const buttonPadding = css<ButtonProps>`
  padding: 0.5em ${({ size }) => (size === 'small') ? '0.8em' : '1em'};
`;

const buttonColor = css<ButtonProps>`
  color: ${colors.white};
  background-color: ${({ color }) => (color === 'negative') ? colors.orange : colors.green};
  
  ::before {
    background-color: ${colors.white};
  }
  
  :disabled {
    background-color: ${colors.dark_grey};
    color: ${colors.grey};
  }
  
  :disabled::before {
    background-color: ${colors.grey};
  }

  :enabled:active {
    background-color: ${({ color }) => (color === 'negative') ? colors.orange_active : colors.green_active};
  }
`;

export default styled.button<ButtonProps>`
  border-radius: 0.3em;
  border: none;
  cursor: pointer;
  ${buttonFontSize}
  ${buttonPadding}
  ${buttonColor}
  ${buttonIcon}

  &:disabled {
    cursor: default;
  }
`;
