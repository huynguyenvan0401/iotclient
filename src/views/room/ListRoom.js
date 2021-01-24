import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchRooms } from 'actions/room';
import { fetchReadyDevice } from 'actions/device';
import axios from 'axios';
import keys from 'config/keys';
import authHeader from 'services/auth-header';
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CTextarea,
  CSpinner,
} from '@coreui/react';
import './room.css';
import Room from './Room';
const ListRoom = () => {
  const [large, setAddRoom] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const rooms = useSelector((state) => state.rooms);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      return history.push('/login');
    }
    async function prepare() {
      await dispatch(fetchRooms());
      await dispatch(fetchReadyDevice());
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

  //add new room
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

  async function createRoom(name, description) {
    try {
      const url = keys.BASE_URL + '/api/room';
      const body = {
        name,
        description,
      };
      await axios.post(url, body, { headers: authHeader() });
      dispatch(fetchRooms());
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="card">
        <div className="card-header">Danh sách các phòng</div>
        <div className="card-body">
          <CRow className="justify-content-center">
            {pageLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <CSpinner color="info" className="mb-2" />
              </div>
            ) : (
              <>
                {rooms.map((room) => {
                  return <Room key={'room_' + room._id} room={room} />;
                })}
              </>
            )}
            {/* Thêm phòng mới */}
            <CCol xs="12" md="3" className="mb-4">
              <div
                className="wrapper h-100 d-flex align-items-center justify-content-center"
                onClick={() => setAddRoom(!large)}
              >
                <img
                  src={require('./img/plus.svg')}
                  className="button-add"
                  alt=""
                  style={{ height: '120px' }}
                />
              </div>
            </CCol>
          </CRow>
        </div>
        {/* Modal thêm phòng mới */}
        <CModal
          show={large}
          onClose={() => setAddRoom(!large)}
          size="lg"
          color="success"
        >
          <CModalHeader closeButton>
            <CModalTitle>Thêm phòng mới</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup row className="mt-3">
              <CCol md="2">
                <CLabel htmlFor="room-name-input">Tên phòng</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CInput
                  id="room-name-input"
                  placeholder="Tên phòng"
                  name="name"
                  value={roomForm.name}
                  onChange={(e) => handleRoomFormChange(e)}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="room-description-textarea">Mô tả</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CTextarea
                  id="room-description-textarea"
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
                createRoom(roomForm.name, roomForm.description);
                setRoomForm({ name: '', description: '' });
                setAddRoom(!large);
              }}
            >
              Thêm mới
            </CButton>{' '}
            <CButton color="secondary" onClick={() => setAddRoom(!large)}>
              Hủy
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </>
  );
};

export default ListRoom;
