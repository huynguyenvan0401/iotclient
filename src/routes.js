import React from 'react';

const Tables = React.lazy(() => import('./views/table/Tables'));
//Định nghĩa nguồn trang
const Monitor = React.lazy(() => import('./views/monitor/Monitor'));
const Room = React.lazy(() => import('./views/room/ListRoom'));
const DeviceReady = React.lazy(() => import('./views/device/DeviceReady'));
const DeviceUsed = React.lazy(() => import('./views/device/DeviceUsed'));

//Định nghĩa đường dẫn cho trang
const routes = [
  { path: '/', exact: true, name: 'Trang chủ', component: Monitor },
  { path: '/monitor', name: 'Theo dõi', component: Monitor }, //Trang theo dõi
  { path: '/room', name: 'Quản lý phòng', component: Room }, //Trang danh sách phòng
  { path: '/device/ready', name: 'Thiết bị sẵn sàng', component: DeviceReady }, //Trang danh sách các thiết bị sẵn sàng
  {
    path: '/device/used',
    name: 'Thiết bị đang sử dụng',
    component: DeviceUsed,
  }, //Trang danh sách thiết bị đang sử dụng
];

export default routes;
