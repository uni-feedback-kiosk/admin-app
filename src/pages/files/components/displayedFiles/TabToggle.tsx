import { createRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/ui/Button';
import colors from '../../../../constants';

type TabTogglePropName = 'name' | 'value' | 'defaultChecked' | 'children' | 'onChange';
type TabToggleProps = Pick<InputHTMLAttributes<HTMLInputElement>, TabTogglePropName>;

const TabWrapper = styled.div`
  flex: 1;
`;

const StyledSwitchButton = styled(Button)`
  display: block;
  text-align: center;
  box-sizing: border-box;
  transition: all 0.2s;
  margin: 0;
  border: 0.1em solid ${colors.green};
  border-radius: 0.5em;
  padding: 0.5em;
  color: #000;
  width: 100%;
  background-color: ${colors.white};

  input:checked + & {
    background-color: ${colors.green};
    color: ${colors.white};
  }

  :enabled:active {
    color: ${colors.white};
  }
`;

const StyledInput = styled.input`
  display: none;
  appearance: none;
  margin: 0;
`;

export default ({ name, value, defaultChecked, children, onChange }: TabToggleProps) => {
  const radioRef = createRef<HTMLInputElement>();

  return (
    <TabWrapper>
      <StyledInput
        ref={radioRef}
        type="radio"
        onChange={onChange}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
      />
      <StyledSwitchButton onClick={() => radioRef.current?.click()}>{children}</StyledSwitchButton>
    </TabWrapper>
  );
};
