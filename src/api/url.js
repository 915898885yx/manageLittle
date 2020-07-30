const domain = '/imageCollectCenter'

const postUrl = {
  userQueryMenus: domain + '/User/queryMenus', // 获取菜单
  userLogin: domain + '/User/login', // 登录
  userSaveOrUpdateUser: domain + '/User/saveOrUpdateUser', //新增用户
  userQueryUserByCondition: domain + '/User/queryUserByCondition', // 查询用户列表
  schoolQuerySchoolByCondition: domain + '/School/querySchoolByCondition', // 查询学校列表
  schoolSaveOrUpdateSchool: domain + '/School/saveOrUpdateSchool', // 新增学校
  projectSaveOrUpdateProject: domain + '/Project/saveOrUpdateProject', // 项目新增或修改
  projectQueryProjectByCondition: domain + '/Project/queryProjectByCondition', // 查询项目
  projectQueryProjectsAndSchools: domain + '/Project/queryProjectsAndSchools', // 查询学校和项目列表
  studentQueryStudentByCondition: domain + '/Student/queryStudentByCondition', // 根据条件查询学生信息
  importImportProjectData: domain + '/Import/ImportProjectData', // 导入excel
  studentUploadImage: domain + '/Student/uploadImage', // 批量导入学生得身份证照片
  statisticQueryRate: domain + "/Statistic/queryRate", // 进度查询
  studentSaveOrUpdateStudent: domain + "/Student/saveOrUpdateStudent", // 审核修改状态接口
  studentQueryStudentBySchool: domain + "/Student/queryStudentBySchool", // 根绝学校查询学生信息
  downloadDownloadStudentInfo: domain + "/Download/downloadStudentInfo", // 批量下载学生信息
  downloadDownloadStudentInfoByIds: domain + "/Download/downloadStudentInfoByIds", // 下载
}
export default postUrl