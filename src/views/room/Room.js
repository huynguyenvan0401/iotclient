import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import keys from 'config/keys';
import authHeader from 'services/auth-header';
import { fetchRooms } from 'actions/room';
import { fetchReadyDevice } from 'actions/device';
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CTabs,
  CNav,
  CNavLink,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNavItem,
  CTabPane,
  CTabContent,
  CDataTable,
  CFormGroup,
  CSwitch,
  CSelect,
  CLabel,
  CFormText,
  CTextarea,
  CInput,
} from '@coreui/react';

const Room = (props) => {
  const { room } = props;
  const dispatch = useDispatch();
  const [large, setConfig] = useState(false);
  const [danger, setConfirm] = useState(false);
  const fields = [
    { key: 'name', label: 'Tên thiết bị', _style: { width: '30%' } },
    { key: 'type', label: 'Loại thiết bị', _style: { width: '30%' } },
    { key: 'deviceCode', label: 'Mã thiết bị', _style: { width: '30%' } },
    {
      key: 'delete',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false,
    },
  ];
  const readyDevice = useSelector((state) => state.readyDevice);
  //remove device from room
  async function removeDevice(deviceId) {
    try {
      const url =
        keys.BASE_URL + '/api/room/' + room._id + '/device/' + deviceId;
      await axios.delete(url, { headers: authHeader() });
      dispatch(fetchRooms());
      dispatch(fetchReadyDevice());
    } catch (err) {
      console.log(err);
    }
  }
  const [selectedDevice, setSelectedDevice] = useState('');
  function handleSelectDevice(e) {
    const { value } = e.target;
    setSelectedDevice(value);
  }

  async function addDevice() {
    if (!selectedDevice) return;
    try {
      const url = keys.BASE_URL + '/api/room/' + room._id + '/device';
      const body = {
        deviceId: selectedDevice,
      };
      setSelectedDevice('');
      await axios.post(url, body, { headers: authHeader() });
      dispatch(fetchRooms());
      dispatch(fetchReadyDevice());
    } catch (err) {
      console.log(err);
    }
  }

  //update room
  const [updateRoom, setUpdateRoom] = useState(false);
  const [roomForm, setRoomForm] = useState({
    name: '',
    description: '',
  });

  function handleRoomFormChange(event) {
    const { name, value } = event.target;
    setRoomForm((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  async function updateRoomInfor(name, description) {
    try {
      const url = keys.BASE_URL + '/api/room/' + room._id;
      const body = {
        name,
        description,
      };
      await axios.put(url, body, { headers: authHeader() });
      dispatch(fetchRooms());
    } catch (err) {
      console.log(err);
    }
  }
  //delete room
  async function deleteRoom() {
    try {
      const url = keys.BASE_URL + '/api/room/' + room._id;
      await axios.delete(url, { headers: authHeader() });
      dispatch(fetchRooms());
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <CCol xs="12" md="3" className="mb-4">
        <div className="wrapper">
          <div className="clash-card barbarian">
            <div className="clash-card__image clash-card__image--barbarian">
              <img
                src="https://cdn.dribbble.com/users/4702597/screenshots/11439362/media/e6fe5287a8263659a89222fbb16e64b4.jpg?compress=1&resize=800x600"
                alt="barbarian"
              />
            </div>
            {/* Tên phòng */}
            <div className="clash-card__unit-name">{room.name}</div>
            {/* Mô tả */}
            <div className="clash-card__unit-description">
              {room.description}
            </div>
            <div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix d-flex">
              <div className="one-third color-info border-bl">
                <div className="stat-value" onClick={() => setConfig(!large)}>
                  Quản lý
                </div>
              </div>
              <div className="one-third no-border color-danger">
                <div
                  className="stat-value"
                  onClick={() => {
                    setRoomForm({
                      name: room.name,
                      description: room.description,
                    });
                    setUpdateRoom(!updateRoom);
                  }}
                >
                  Sửa
                </div>
              </div>
              <div className="one-third no-border color-info border-br">
                <div className="stat-value" onClick={() => setConfirm(!danger)}>
                  Xóa
                </div>
              </div>
            </div>
          </div>
        </div>
      </CCol>
      {/* Modal update room */}
      <CModal
        show={updateRoom}
        onClose={() => setUpdateRoom(!updateRoom)}
        size="lg"
        color="success"
      >
        <CModalHeader closeButton>
          <CModalTitle>Cập nhật thông tin phòng</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row className="mt-3">
            <CCol md="2">
              <CLabel htmlFor={'room-name-input' + room._id}>Tên phòng</CLabel>
            </CCol>
            <CCol xs="12" md="10">
              <CInput
                id={'room-name-input' + room._id}
                placeholder="Tên phòng"
                name="name"
                value={roomForm.name}
                onChange={(e) => handleRoomFormChange(e)}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="2">
              <CLabel htmlFor={'room-description-textarea' + room._id}>
                Mô tả
              </CLabel>
            </CCol>
            <CCol xs="12" md="10">
              <CTextarea
                id={'room-description-textarea' + room._id}
                rows="9"
                placeholder="Mô tả phòng..."
                name="description"
                value={roomForm.description}
                onChange={(e) => handleRoomFormChange(e)}
              />
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={() => {
              updateRoomInfor(roomForm.name, roomForm.description);
              setRoomForm({ name: '', description: '' });
              setUpdateRoom(!updateRoom);
            }}
          >
            Cập nhật
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setUpdateRoom(!updateRoom)}>
            Hủy
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Modal quản lý phòng */}
      <CModal
        show={large}
        onClose={() => setConfig(!large)}
        size="lg"
        color="info"
      >
        <CModalHeader closeButton>
          <CModalTitle>Quản lý chi tiết phòng</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTabs activeTab="device">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="device">Danh sách thiết bị phòng</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="add-device">Thêm thiết bị mới</CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              {/* Tab quản lý thiết bị phòng */}
              <CTabPane data-tab="device">
                <CDataTable
                  items={room.devices}
                  fields={fields}
                  itemsPerPage={5}
                  pagination
                  scopedSlots={{
                    delete: function initDelete(item) {
                      return (
                        <td className="py-2">
                          <CButton
                            color="danger"
                            onClick={() => removeDevice(item._id)}
                          >
                            Xóa
                          </CButton>
                        </td>
                      );
                    },
                  }}
                />
                {/* Cập nhật
                <CButton
                  color="info"
                  style={{
                    position: "absolute",
                    bottom: "32px",
                    right: "16px",
                  }}
                >
                  Cập nhật
                </CButton>*/}
              </CTabPane>
              {/* Tab thêm mới thiết bị */}
              <CTabPane data-tab="add-device">
                <CFormGroup row className="mt-4">
                  <CCol md="3">
                    <CLabel htmlFor="select-device-to-add">
                      Chọn tên thiết bị thêm mới
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      id="select-device-to-add"
                      name="select-device-to-add"
                      value={selectedDevice}
                      onChange={(e) => handleSelectDevice(e)}
                    >
                      <option value="">Chọn tên thiết bị</option>
                      {readyDevice.map((device) => {
                        return (
                          <option
                            key={'select_' + device._id}
                            value={device._id}
                          >
                            {device.name}
                          </option>
                        );
                      })}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <div className="d-flex justify-content-end">
                  <CButton
                    color="success"
                    style={{ float: 'left' }}
                    onClick={() => addDevice()}
                  >
                    Thêm mới
                  </CButton>
                </div>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setConfig(!large)}>
            Hủy
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Modal xác thực xóa phòng */}
      <CModal show={danger} onClose={() => setConfirm(!danger)} color="danger">
        <CModalHeader closeButton>
          <CModalTitle>Xác nhận</CModalTitle>
        </CModalHeader>
        <CModalBody>Bạn có chắc chắn muốn xóa phòng này?</CModalBody>
        <CModalFooter>
          <CButton
            color="danger"
            onClick={() => {
              deleteRoom();
              setConfirm(!danger);
            }}
          >
            Xóa
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setConfirm(!danger)}>
            Hủy
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};
Room.propTypes = {
  room: PropTypes.object,
};
export default Room;
