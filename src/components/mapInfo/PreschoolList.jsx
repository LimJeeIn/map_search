import React, { useState } from 'react';
import locationIcon from '../../assets/icon/icon-map-location.svg';
import SearchIcon from '../../assets/icon/icon-search.svg';
import * as S from './PreschoolList.style';

export default function PreschoolList({
  list,
  onLocationChange,
  handleSearchChange,
  searchValue,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;

  const handleLocationClick = (STCODE, LA, LO) => {
    if (LA && LO) {
      onLocationChange(STCODE);
    } else {
      alert('정보가 없습니다.');
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    handleSearchChange(inputValue);
  };

  const filteredLists = list.filter(
    (el) => el.CRNAME && el.CRNAME.includes(searchValue),
  );

  const displayedPreschools = filteredLists.slice(
    currentPage * perPage,
    currentPage * perPage + perPage,
  );

  const pageCount = Math.ceil(filteredLists.length / perPage);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    handleSearchChange(inputValue);
    setCurrentPage(0); // 페이지네이션을 1페이지로 되돌린다
  };

  return (
    <>
      <S.ListContainer>
        <h2 className="a11y-hidden">STORE</h2>
        <S.SearchContainer>
          <form onSubmit={(e) => e.preventDefault()}>
            <S.SearchInput
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <S.SearchButton type="button" onClick={handleSubmit}>
              <S.SearchSubmitIcon src={SearchIcon} />
            </S.SearchButton>
          </form>
        </S.SearchContainer>
        {displayedPreschools.map(
          ({ STCODE, CRNAME, CRADDR, CRTELNO, LA, LO }) => (
            <div
              className={`preschool-list-item data-card`}
              data-id={STCODE}
              key={STCODE}
            >
              <S.ListContent>
                <S.ContentWrapper>
                  <S.ContentTitle className="name">{CRNAME}</S.ContentTitle>
                  <S.ContentInfo className="address">{CRADDR}</S.ContentInfo>
                  <S.ContentNumber className="en">
                    <S.ContentNumberBold className="bold">
                      TEL
                    </S.ContentNumberBold>
                    {CRTELNO}
                  </S.ContentNumber>
                </S.ContentWrapper>

                <S.Location
                  src={locationIcon}
                  onClick={() => handleLocationClick(STCODE, LA, LO)}
                />
              </S.ListContent>
            </div>
          ),
        )}

        <S.StyledReactPaginate
          forcePage={currentPage}
          pageCount={pageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={5}
          previousLabel={'<'}
          nextLabel={'>'}
          onPageChange={(data) => handlePageClick(data)}
          containerClassName={'pagination no-break'}
          activeClassName={'active'}
        />
      </S.ListContainer>
    </>
  );
}
