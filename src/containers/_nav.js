export default [
  //Tab theo dõi, biểu đồ
  {
    _tag: 'CSidebarNavItem',
    name: 'Theo dõi',
    to: '/monitor',
    icon: 'cil-monitor',
    badge: {
      color: 'danger',
      text: 'Mới',
    }
  },
  //Quản lý phòng
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý phòng']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh sách phòng',
    to: '/room',
    icon: 'cil-room',
  },
  // Quản lý thiết bị, sensor
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý thiết bị - sensor']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Thiết bị',
    route: '/device',
    icon: 'cil-devices',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Thiết bị sẵn sàng',
        to: '/device/ready',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Thiết bị đang sử dụng',
        to: '/device/used',
      },
    ],
  },
]

