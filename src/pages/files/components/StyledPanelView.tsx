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

export default ({ panels } : { panels: ReactElement<PanelProps>[] }) => (
  <StyledPanelView>
    {panels}
  </StyledPanelView>
);
