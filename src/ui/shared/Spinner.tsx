import styled from 'styled-components';

const SpinnerDiv = styled.div`
  text-align: center;
`;

export function Spinner() {
  return <SpinnerDiv aria-label="Loading...">
    <i className="icon fa-solid fa-spinner" aria-hidden="true"></i>
  </SpinnerDiv>;
}
