import { ReactElement } from 'react';
import styled from 'styled-components';
import { PanelProps } from '../../../components/ui/Panel';

const StyledPanelView = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: stretch;
  gap: 1em;
  height: 100%;
`;

type Panel = ReactElement<PanelProps>;

export default ({ left, right } : { left: Panel, right: Panel }) => (
  <StyledPanelView>
    {left}
    {right}
  </StyledPanelView>
);
