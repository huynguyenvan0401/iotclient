import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from 'actions/data';
import { fetchRooms } from 'actions/room';

import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import ChartLineSimple from './ChartLineSimple';
import ChartBarSimple from './ChartBarSimple';

// Biểu đồ thống kê chung
const Widgets = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const [pageLoading, setPageLoading] = useState(true);
  const data = useSelector((state) => state.data);

  useEffect(() => {
    async function prepare() {
      await dispatch(fetchRooms());
      await dispatch(fetchData());
    }
    setPageLoading(true);
    let mounted = true;
    prepare().then(() => {
      if (mounted) {
        setPageLoading(false);
      }
    });
    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [info, setInfo] = useState({
    usingDevice: '0',
    numRoom: '0',
    usingSensor: '0',
    temperature: '0',
  });

  useEffect(() => {
    let usingDevice = 0;
    let numRoom = 0;
    let usingSensor = 0;

    numRoom = rooms.length;
    for (let i = 0; i < numRoom; i++) {
      usingDevice += rooms[i].devices.length;
      for (let j = 0; j < rooms[i].devices.length; j++) {
        usingSensor += rooms[i].devices[j].sensors.length;
      }
    }
    setInfo((prevValues) => {
      return {
        ...prevValues,
        usingDevice: usingDevice.toString(),
        usingSensor: usingSensor.toString(),
        numRoom: numRoom.toString(),
      };
    });
  }, [rooms]);

  useEffect(() => {
    if (data) {
      let currOBj = data[data.length - 1];
      if (currOBj && currOBj.temperature) {
        let temp = data[data.length - 1].temperature;

        setInfo((prevValues) => {
          return {
            ...prevValues,
            temperature: temp.toString(),
          };
        });
      }
    }
  }, [data]);

  return (
    <CRow>
      {/* Nhiệt độ chung ngôi nhà */}
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          header={info.temperature + '°C'}
          text="Nhiệt độ ngôi nhà"
          className="gd-pink"
        >
          <img
            src={require('./img/temperature.svg')}
            className="img-fix-widgets-sm pb-2"
            alt=""
          />
        </CWidgetDropdown>
      </CCol>
      {/* Thống kê số phòng quản lý */}
      <CCol sm="6" lg="3">
        <CWidgetDropdown header={info.numRoom} text="Phòng" className="gd-blue">
          <img
            src={require('./img/sofa.svg')}
            className="img-fix-widgets pb-2"
            alt=""
          />
        </CWidgetDropdown>
      </CCol>
      {/* Thống kê số thiết bị hoạt động */}
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          className="gd-green"
          header={info.usingDevice}
          text="Thiết bị hoạt động"
        >
          <img
            src={require('./img/profile.svg')}
            className="img-fix-widgets pb-2"
            alt=""
          />
        </CWidgetDropdown>
      </CCol>
      {/* Thống kê số sensor hoạt động */}
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          className="gd-black"
          header={info.usingSensor}
          text="Sensor hoạt động"
        >
          <img
            src={require('./img/kinect.svg')}
            className="img-fix-widgets-sm pb-2"
            alt=""
          />
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default Widgets;
