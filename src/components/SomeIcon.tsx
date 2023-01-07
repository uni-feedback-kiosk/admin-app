import styled from 'styled-components';

const StyledIcon = styled.div`
  font-family: 'Noto Color Emoji', sans-serif;
`;

export default ({ className }: { className?: string }) => (
  <StyledIcon className={className}>🐳</StyledIcon>
);
