import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

export const ListContent = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  border-bottom: 1px solid #ddd;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContentTitle = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  font-size: 17px;
  color: var(--main-color);
`;

export const ContentInfo = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  color: var(--sub-text-color);
`;
export const ContentNumber = styled.p`
  font-size: 15px;
  color: var(--sub-text-color);
`;

export const ContentNumberBold = styled.span`
  padding-right: 7px;
`;

export const Location = styled.img`
  width: 32px;
  object-fit: cover;
  cursor: pointer;
  margin-left: 50px;
`;

export const ListContainer = styled.article`
  width: 30%;
  height: 100%;
  overflow-y: scroll;

  @media (max-width: 1080px) {
    width: 100%;
    height: 100%;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
`;

export const SearchInput = styled.input`
  padding: 2px 15px 2px 2px;
  margin-right: 9px;
`;

export const SearchButton = styled.button`
  vertical-align: bottom;
`;

export const SearchSubmitIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px;

  &.pagination.no-break .break {
    display: none;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  li {
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
    padding: 5px 8px;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .active {
    font-size: 20px;
    font-weight: 700;
    color: var(--main-color);
  }
`;
