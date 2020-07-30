// const Layout = () => import('@/views/layout/layout')
const UserManage = () => import('@/views/pages/userManage')
const InstituteManage = () => import('@/views/pages/instituteManage')
const ProjectManage = () => import('@/views/pages/projectManage')
const StudentManage = () => import('@/views/pages/studentManage')
const StudentImport = () => import('@/views/pages/studentManage/studentImport')
const ScheduleQuery = () => import('@/views/pages/scheduleQuery')
const Checking = () => import('@/views/pages/studentManage/checking')
const Checked = () => import('@/views/pages/studentManage/checked')
const menus = [
  {
    path: 'userManage',
    name: 'UserManage',
    component: UserManage,
    mate: {
      menuName: '用户管理',
      url: '/layout/userManage'
    }
  },
  {
    path: 'scheduleQuery',
    name: 'ScheduleQuery',
    component: ScheduleQuery,
    mate: {
      menuName: '进度查询',
      url: '/layout/scheduleQuery'
    }
  },
  {
    path: 'instituteManage',
    name: 'InstituteManage',
    component: InstituteManage,
    mate: {
      menuName: '院校管理',
      url: '/layout/instituteManage'
    }
  },
  {
    path: 'projectManage',
    name: 'ProjectManage',
    component: ProjectManage,
    mate: {
      menuName: '项目管理',
      url: '/layout/ProjectManage'
    }
  },
  {
    path: 'studentManage',
    name: 'studentManage',
    component: StudentManage,
    redirect: '/layout/studentManage/studentImport',
    mate: {
      menuName: '学生管理'
    },
    children: [
      {
        path: 'studentImport',
        name: 'studentImport',
        component: StudentImport,
        mate: {
          menuName: '数据查询',
          url: '/layout/studentManage/studentImport'
        }
      },
      {
        path: 'checking',
        name: 'checking',
        component: Checking,
        mate: {
          menuName: '待审核',
          url: '/layout/studentManage/checking'
        }
      },
      {
        path: 'checked',
        name: 'checked',
        component: Checked,
        mate: {
          menuName: '已审核',
          url: '/layout/studentManage/checked'
        }
      }
    ]
  }
]
export default menus