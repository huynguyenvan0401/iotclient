import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import keys from 'config/keys';
import authHeader from 'services/auth-header';
import { fetchReadyDevice, fetchUsedDevice } from 'actions/device';
import { useDispatch } from 'react-redux';
import {
  CSwitch,
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
  CSelect,
  CLabel,
  CInput,
  CTextarea,
} from '@coreui/react';
const ListSensor = (props) => {
  const dispatch = useDispatch();
  const { sensors, deviceId, deviceCode } = props;
  // Mô tả các trường cho bảng sensor
  const fieldSensor = [
    { key: 'name', label: 'Tên', _style: { width: '30%' } },
    { key: 'type', label: 'Loại', _style: { width: '10%' } },
    { key: 'description', label: 'Mô tả', _style: { width: '30%' } },
    { key: 'sensorCode', label: 'Mã', _style: { width: '10%' } },
    { key: 'status', label: 'Trạng thái', _style: { width: '10%' } },
    {
      key: 'actionSensor',
      label: '',
      _style: { width: '12%' },
      sorter: false,
      filter: false,
    },
  ];
  const [add, setAdd] = useState(false);
  const [deleteS, setDltS] = useState(false);
  const [updateS, setUpdateS] = useState(false);
  const [sensorForm, setSensorForm] = useState({
    sensorId: '', //used for update sensor
    name: '',
    description: '',
    type: '',
    commandOn: '',
    commandOff: '',
    sensorCode: '',
  });

  function handleSensorFormChange(event) {
    const { name, value } = event.target;
    setSensorForm((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  async function addNewSensor(data, deviceId) {
    try {
      const {
        name,
        description,
        type,
        commandOn,
        commandOff,
        sensorCode,
      } = data;
      const body = {
        name,
        description,
        type,
        commandOn,
        commandOff,
        sensorCode,
      };
      const url = keys.BASE_URL + '/api/device/' + deviceId + '/sensor';
      await axios.post(url, body, { headers: authHeader() });
      dispatch(fetchReadyDevice());
      dispatch(fetchUsedDevice());
    } catch (err) {
      console.log(err);
    }
  }

  async function updateSensor(data, deviceId, sensorId) {
    try {
      const {
        name,
        description,
        type,
        commandOn,
        commandOff,
        sensorCode,
      } = data;
      const body = {
        name,
        description,
        type,
        commandOn,
        commandOff,
        sensorCode,
      };
      const url =
        keys.BASE_URL + '/api/device/' + deviceId + '/sensor/' + sensorId;
      await axios.put(url, body, { headers: authHeader() });
      dispatch(fetchReadyDevice());
      dispatch(fetchUsedDevice());
    } catch (err) {
      console.log(err);
    }
  }

  const [deleteSensorId, setDeleteSensorId] = useState('');
  async function deleteSensor(deviceId, sensorId) {
    try {
      const url =
        keys.BASE_URL + '/api/device/' + deviceId + '/sensor/' + sensorId;
      await axios.delete(url, { headers: authHeader() });
      dispatch(fetchReadyDevice());
      dispatch(fetchUsedDevice());
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSwitchChange(deviceCode, sensorCode, command) {
    try {
      const url = keys.BASE_URL + '/api/controll-sensor';
      const body = {
        deviceCode,
        sensorCode,
        command,
      };
      await axios.post(url, body, { headers: authHeader() });
      setTimeout(() => {
        dispatch(fetchReadyDevice());
        dispatch(fetchUsedDevice());
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h5>Danh sách sensor trong thiết bị</h5>
      <div className="d-flex justify-content-end">
        <CButton
          size="sm"
          color="success"
          className="mb-2"
          onClick={() => setAdd(!add)}
        >
          Thêm sensor
        </CButton>
      </div>

      <CDataTable
        items={sensors}
        fields={fieldSensor}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          status: function initStatus(item) {
            return (
              <td>
                <CSwitch
                  className={'mx-1'}
                  variant={'3d'}
                  color={'success'}
                  checked={item.status === 'on' ? true : false}
                  size="sm"
                  onChange={(e) => {
                    let checked = e.target.checked;
                    let command = '';
                    if (checked) {
                      command = item.command.on;
                    } else {
                      command = item.command.off;
                    }
                    handleSwitchChange(deviceCode, item.sensorCode, command);
                  }}
                />
              </td>
            );
          },
          actionSensor: function initActionSensor(item) {
            return (
              <td className="d-flex align-items-center">
                <CButton
                  color="info"
                  onClick={() => {
                    setSensorForm((prevValues) => {
                      return {
                        ...prevValues,
                        sensorId: item._id,
                        name: item.name,
                        description: item.description,
                        type: item.type,
                        commandOn: item.command.on,
                        commandOff: item.command.off,
                        sensorCode: item.sensorCode,
                      };
                    });
                    setUpdateS(!updateS);
                  }}
                  className="mr-2"
                  size="sm"
                >
                  Cập nhật
                </CButton>
                <CButton
                  color="danger"
                  onClick={() => {
                    setDeleteSensorId(item._id);
                    setDltS(!deleteS);
                  }}
                  size="sm"
                >
                  Xóa
                </CButton>
              </td>
            );
          },
        }}
      />
      {/* Modal cập nhật sensor */}
      <CModal
        show={updateS}
        onClose={() => setUpdateS(!updateS)}
        color="info"
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Cập nhật sensor</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row className="mt-3">
            <CCol md="3">
              <CLabel htmlFor={'update-sensor-code-input' + deviceId}>
                Mã sensor
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id={'update-sensor-code-input' + deviceId}
                placeholder="Mã sensor"
                name="sensorCode"
                value={sensorForm.sensorCode}
                onChange={(e) => handleSensorFormChange(e)}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row className="mt-3">
            <CCol md="3">
              <CLabel htmlFor={'update-sensor-name-input' + deviceId}>
                Tên sensor
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id={'update-sensor-name-input' + deviceId}
                placeholder="Tên sensor"
                name="name"
                value={sensorForm.name}
                onChange={(e) => handleSensorFormChange(e)}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row className="mt-3">
            <CCol md="3">
              <CLabel htmlFor={'update-select-sensor-type' + deviceId}>
                Chọn loại sensor
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect
                custom
                id={'update-select-sensor-type' + deviceId}
                name="type"
                value={sensorForm.type}
                onChange={(e) => handleSensorFormChange(e)}
              >
                <option value="">Chọn loại</option>
                <option value="light">Bóng đèn</option>
                <option value="temperature">Đô nhiệt độ</option>
                <option value="humidity">Đo độ ẩm</option>
                <option value="temperature & humidity">
                  Đô nhiệt độ và độ ẩm
                </option>
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="mt-3">
            <CCol md="3">
              <CLabel htmlFor={'update-sensor-comman-on-input' + deviceId}>
                Lệnh bật
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id={'update-sensor-comman-on-input' + deviceId}
                placeholder="Lệnh bật sensor"
                name="commandOn"
                value={sensorForm.commandOn}
                onChange={(e) => handleSensorFormChange(e)}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row className="mt-3">
            <CCol md="3">
              <CLabel htmlFor={'update-sensor-comman-off-input' + deviceId}>
                Lệnh tắt
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id={'update-sensor-comman-off-input' + deviceId}
                placeholder="Lệnh tắt sensor"
                name="commandOff"
                value={sensorForm.commandOff}
                onChange={(e) => handleSensorFormChange(e)}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor={'update-sensor-description-textarea' + deviceId}>
                Mô tả
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CTextarea
                id={'update-sensor-description-textarea' + deviceId}
                rows="4"
                placeholder="Mô tả sensor..."
                name="description"
                value={sensorForm.description}
                onChange={(e) => handleSensorFormChange(e)}
              />
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="info"
            onClick={() => {
              updateSensor(sensorForm, deviceId, sensorForm.sensorId);
              setUpdateS(!updateS);
            }}
          >
            Cập nhật
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setUpdateS(!updateS)}>
            Hủy
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Modal tao moi sensor */}
      <CModal show={add} onClose={() => setAdd(!add)} color="info" size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Thêm sensor</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row className="mt-3">
            <CCol md="3">
              <CLabel htmlFor={'sensor-code-input' + deviceId}>
                Mã sensor
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id={'sensor-code-input' + deviceId}
                placeholder="Mã sensor"
                name="sensorCode"
                value={sensorForm.sensorCode}
                onChange={(e) => handleSensorFormChange(e)}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row className="mt-3">
            <CCol md="3">
              <CLabel htmlFor={'sensor-name-input' + deviceId}>
                Tên sensor
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id={'sensor-name-input' + deviceId}
                placeholder="Tên sensor"
                name="name"
                value={sensorForm.name}
                onChange={(e) => handleSensorFormChange(e)}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row className="mt-3">
            <CCol md="3">
              <CLabel htmlFor={'select-sensor-type' + deviceId}>
                Chọn loại sensor
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect
                custom
                id={'select-sensor-type' + deviceId}
                name="type"
                value={sensorForm.type}
                onChange={(e) => handleSensorFormChange(e)}
              >
                <option value="">Chọn loại</option>
                <option value="light">Bóng đèn</option>
                <option value="temperature">Đô nhiệt độ</option>
                <option value="humidity">Đo độ ẩm</option>
                <option value="temperature & humidity">
                  Đô nhiệt độ và độ ẩm
                </option>
              </CSelect>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="mt-3">
            <CCol md="3">
              <CLabel htmlFor={'sensor-comman-on-input' + deviceId}>
                Lệnh bật
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id={'sensor-comman-on-input' + deviceId}
                placeholder="Lệnh bật sensor"
                name="commandOn"
                value={sensorForm.commandOn}
                onChange={(e) => handleSensorFormChange(e)}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row className="mt-3">
            <CCol md="3">
              <CLabel htmlFor={'sensor-comman-off-input' + deviceId}>
                Lệnh tắt
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id={'sensor-comman-off-input' + deviceId}
                placeholder="Lệnh tắt sensor"
                name="commandOff"
                value={sensorForm.commandOff}
                onChange={(e) => handleSensorFormChange(e)}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor={'sensor-description-textarea' + deviceId}>
                Mô tả
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CTextarea
                id={'sensor-description-textarea' + deviceId}
                rows="4"
                placeholder="Mô tả sensor..."
                name="description"
                value={sensorForm.description}
                onChange={(e) => handleSensorFormChange(e)}
              />
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="info"
            onClick={() => {
              addNewSensor(sensorForm, deviceId);
              setAdd(!add);
            }}
          >
            Thêm mới
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setAdd(!add)}>
            Hủy
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Modal xóa sensor */}
      <CModal show={deleteS} onClose={() => setDltS(!deleteS)} color="danger">
        <CModalHeader closeButton>
          <CModalTitle>Xác nhận</CModalTitle>
        </CModalHeader>
        <CModalBody>Bạn có chắc chắn muốn xóa sensor này?</CModalBody>
        <CModalFooter>
          <CButton
            color="danger"
            onClick={() => {
              deleteSensor(deviceId, deleteSensorId);
              setDltS(!deleteS);
            }}
          >
            Xóa
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setDltS(!deleteS)}>
            Hủy
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};
ListSensor.propTypes = {
  sensors: PropTypes.array,
  deviceId: PropTypes.string,
  deviceCode: PropTypes.string,
};
export default ListSensor;
