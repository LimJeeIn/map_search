/* global kakao */

import React, { useEffect, useState } from 'react';
import * as S from './PreschoolMap.style';

function PreschoolMap({
  list,
  mapList,
  searchValue,
  handleLocationChange,
  setMapList,
  setMarkers,
  map,
  setMap,
}) {
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=17703254ea82341d185ec5149d6948f4&libraries=services';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.566824, 126.978652),
        level: 8,
      };
      const map = new kakao.maps.Map(container, options);

      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      setMap(map);
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    const newMarkers = mapList
      .map(({ CRNAME, LA, LO, STCODE }) => {
        // 데이터가 없는 경우 경고창 표시 조건 추가
        if (!CRNAME || !LA || !LO) {
          return null;
        }

        const position = new kakao.maps.LatLng(LA, LO);

        const marker = new kakao.maps.Marker({
          position,
          map,
        });
        marker.STCODE = STCODE; // STCODE 속성 추가

        const infowindow = new kakao.maps.InfoWindow({
          position,
          content: `<div style="padding:5px; font-size:12px;">${CRNAME}</div>`,
        });

        kakao.maps.event.addListener(marker, 'mouseover', function () {
          infowindow.open(map, marker);
        });

        kakao.maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close();
        });

        kakao.maps.event.addListener(marker, 'click', function () {
          // 확대하려는 위치 가져오기
          const position = marker.getPosition();
          // 지도 확대해서 위치 중앙에 놓기
          map.setLevel(3); // 확대 수준 변경
          map.setCenter(position);
        });

        return marker;
      })
      .filter((marker) => marker !== null);

    setMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => {
        marker.setMap(null);
      });

      return newMarkers;
    });
  }, [map, mapList, selectedLocationId]);

  useEffect(() => {
    if (!map) return;

    const displayPreschoolByLocationId = (id) => {
      setSelectedLocationId(id);

      const selectedPreschool = list
        .filter((preschool) => preschool.CRNAME.includes(searchValue))
        .find((preschool) => preschool.STCODE === id);

      if (selectedPreschool) {
        const { kakao } = window;
        const coordinates = new kakao.maps.LatLng(
          selectedPreschool.LA,
          selectedPreschool.LO,
        );

        map.setLevel(3); // 확대 수준 변경
        map.setCenter(coordinates); // 확대할 위치 설정
        setMapList([selectedPreschool]); // 지도에 표시된 핀을 선택한 업체로 업데이트
      }
    };

    handleLocationChange(displayPreschoolByLocationId);
  }, [map, handleLocationChange, list, searchValue, setSelectedLocationId]);

  useEffect(() => {
    if (!selectedLocationId || !map || !list) return;

    const selectedPreschool = list
      .filter((preschool) => preschool.CRNAME.includes(searchValue))
      .find((preschool) => preschool.STCODE === selectedLocationId);

    if (selectedPreschool) {
      const { kakao } = window;
      const coordinates = new kakao.maps.LatLng(
        selectedPreschool.LA,
        selectedPreschool.LO,
      );

      if (
        map.getLevel() === 3 &&
        map.getCenter().toString() === coordinates.toString()
      ) {
        map.setLevel(8); // 축소 수준 변경
        map.setCenter(new kakao.maps.LatLng(37.566824, 126.978652));
      } else {
        map.setLevel(3); // 확대 수준 변경
        map.setCenter(coordinates); // 확대할 위치 설정
      }
    }
  }, [selectedLocationId, map, list, searchValue]);

  return <S.PreschoolMapContainer id="map"></S.PreschoolMapContainer>;
}

export default PreschoolMap;
