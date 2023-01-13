import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import colors from '../../../../constants';

type TabTogglePropName = 'name' | 'value' | 'defaultChecked' | 'children' | 'onChange';
type TabToggleProps = Pick<InputHTMLAttributes<HTMLInputElement>, TabTogglePropName>;

const TabWrapper = styled.div`
  flex: 1;
`;

const StyledLabel = styled.label`
  display: block;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0;
  border: 0.1em solid ${colors.green};
  border-radius: 0.5em;
  padding: 0.5em;
  color: #000;
  width: 100%;

  input:checked + & {
    background-color: ${colors.green};
    color: ${colors.white};
  }
`;

const StyledInput = styled.input`
  display: none;
  appearance: none;
  margin: 0;
`;

export default ({ name, value, defaultChecked, children, onChange }: TabToggleProps) => {
  const id = `option-${name}-${value}`;

  return (
    <TabWrapper>
      <StyledInput type="radio" id={id} onChange={onChange} name={name} value={value} defaultChecked={defaultChecked} />
      <StyledLabel htmlFor={id}>{children}</StyledLabel>
    </TabWrapper>
  );
};
