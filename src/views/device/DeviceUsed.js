import React, { useState, useEffect } from 'react';
import axios from 'axios';
import keys from 'config/keys';
import authHeader from 'services/auth-header';
import { fetchUsedDevice } from 'actions/device';
import { useDispatch, useSelector } from 'react-redux';

import {
  CButton,
  CCardBody,
  CCollapse,
  CModal,
  CDataTable,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormGroup,
  CCol,
  CLabel,
  CInput,
  CTextarea,
} from '@coreui/react';
import ListSensor from './ListSensor';
const DeviceUsed = () => {
  const [details, setDetails] = useState([]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  // Mô tả trường cho bảng thiết bị
  const fields = [
    { key: 'name', label: 'Tên thiết bị', _style: { width: '30%' } },
    { key: 'type', label: 'Loại thiết bị', _style: { width: '10%' } },
    { key: 'room', label: 'Phòng sử dụng', _style: { width: '20%' } },
    { key: 'deviceCode', label: 'Mã thiết bị', _style: { width: '15%' } },
    {
      key: 'actionDevice',
      label: '',
      _style: { width: '10%' },
      sorter: false,
      filter: false,
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '8%' },
      sorter: false,
      filter: false,
    },
  ];

  const [danger, setConfirm] = useState(false);
  const [update, setUpdate] = useState(false);

  //mapdata
  //create new device
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  const usedDevice = useSelector((state) => state.usedDevice);
  useEffect(() => {
    async function prepare() {
      await dispatch(fetchUsedDevice());
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

  const [deleteDeviceId, setDeleteDeviceId] = useState('');
  async function deleteDevice(deviceId) {
    try {
      const url = keys.BASE_URL + '/api/device/' + deviceId;
      await axios.delete(url, { headers: authHeader() });
      dispatch(fetchUsedDevice());
    } catch (err) {
      console.log(err);
    }
  }

  //udpate device
  const [updateDeviceForm, setUpdateDeviceForm] = useState({
    deviceId: '',
    name: '',
    description: '',
  });
  function handleUpdateDeviceFormChange(event) {
    const { name, value } = event.target;
    setUpdateDeviceForm((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }
  async function updateDevice(name, description, deviceId) {
    try {
      const url = keys.BASE_URL + '/api/device/' + deviceId;
      await axios.put(url, { name, description }, { headers: authHeader() });
      dispatch(fetchUsedDevice());
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>Danh sách các thiết bị đang sử dụng</div>
      </div>
      <div className="card-body">
        <CDataTable
          items={usedDevice}
          fields={fields}
          columnFilter
          tableFilter
          footer
          itemsPerPageSelect
          itemsPerPage={5}
          hover
          sorter
          pagination
          scopedSlots={{
            actionDevice: function initactionDevice(item) {
              return (
                <td className="d-flex align-items-center">
                  <CButton
                    color="info"
                    className="ml-1"
                    onClick={() => {
                      setUpdateDeviceForm((prevValues) => {
                        return {
                          ...prevValues,
                          name: item.name,
                          description: item.description,
                          deviceId: item._id,
                        };
                      });
                      setUpdate(!update);
                    }}
                  >
                    Cập nhật
                  </CButton>
                  <CButton
                    color="danger"
                    className="ml-1"
                    onClick={() => {
                      setDeleteDeviceId(item._id);
                      setConfirm(!danger);
                    }}
                  >
                    Xóa
                  </CButton>
                </td>
              );
            },
            show_details: function initShowDetailBtn(item, index) {
              return (
                <td className="py-2">
                  <CButton
                    color="info"
                    variant="outline"
                    shape="square"
                    onClick={() => {
                      toggleDetails(index);
                    }}
                  >
                    {details.includes(index) ? 'Ẩn chi tiết' : 'Chi tiết'}
                  </CButton>
                </td>
              );
            },
            details: function initDetail(item, index) {
              return (
                <CCollapse show={details.includes(index)}>
                  <CCardBody>
                    <ListSensor
                      sensors={item.sensors}
                      deviceId={item._id}
                      deviceCode={item.deviceCode}
                    />
                  </CCardBody>
                </CCollapse>
              );
            },
          }}
        />

        {/* Modal cập nhật thiết bị */}
        <CModal
          show={update}
          onClose={() => setUpdate(!update)}
          color="info"
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>Cập nhật thiết bị</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormGroup row className="mt-3">
              <CCol md="2">
                <CLabel htmlFor="update-device-name-input">Tên thiết bị</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CInput
                  id="update-device-name-input"
                  placeholder="Tên thiết bị"
                  name="name"
                  value={updateDeviceForm.name}
                  onChange={(e) => handleUpdateDeviceFormChange(e)}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="2">
                <CLabel htmlFor="update-device-textarea">Mô tả</CLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CTextarea
                  id="update-device-textarea"
                  rows="9"
                  placeholder="Mô tả thiết bị..."
                  name="description"
                  value={updateDeviceForm.description}
                  onChange={(e) => handleUpdateDeviceFormChange(e)}
                />
              </CCol>
            </CFormGroup>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="info"
              onClick={() => {
                updateDevice(
                  updateDeviceForm.name,
                  updateDeviceForm.description,
                  updateDeviceForm.deviceId
                );
                setUpdate(!update);
              }}
            >
              Cập nhật
            </CButton>{' '}
            <CButton color="secondary" onClick={() => setUpdate(!update)}>
              Hủy
            </CButton>
          </CModalFooter>
        </CModal>
        {/* Modal xóa thiết bị */}
        <CModal
          show={danger}
          onClose={() => setConfirm(!danger)}
          color="danger"
        >
          <CModalHeader closeButton>
            <CModalTitle>Xác nhận</CModalTitle>
          </CModalHeader>
          <CModalBody>Bạn có chắc chắn muốn xóa thiết bị này?</CModalBody>
          <CModalFooter>
            <CButton
              color="danger"
              onClick={() => {
                deleteDevice(deleteDeviceId);
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
    </div>
  );
};

export default DeviceUsed;
