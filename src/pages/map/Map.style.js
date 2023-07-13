import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

export const Map = styled.section`
  display: flex;
  padding: 45px 0 60px;
  height: 100vh;

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`;
