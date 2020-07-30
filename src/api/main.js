import postUrl from './url'
import axios from 'axios'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers['access_token'] = sessionStorage.getItem("token")
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export function userQueryMenus (data) {
  const url = postUrl.userQueryMenus
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 登录接口
export function userLogin (data) {
  const url = postUrl.userLogin
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 新增用户
export function userSaveOrUpdateUser(data) {
  const url = postUrl.userSaveOrUpdateUser
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 查询用户列表
export function userQueryUserByCondition (data = {}) {
  const url = postUrl.userQueryUserByCondition
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 查询学校列表
export function schoolQuerySchoolByCondition (data = {}) {
  const url = postUrl.schoolQuerySchoolByCondition
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 新增学校
export function schoolSaveOrUpdateSchool (data = {}) {
  const url = postUrl.schoolSaveOrUpdateSchool
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 新增项目，查询项目
export function projectSaveOrUpdateProject (data = {}) {
  const url = postUrl.projectSaveOrUpdateProject
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 查询项目
export function projectQueryProjectByCondition (data = {}) {
  const url = postUrl.projectQueryProjectByCondition
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 查询学校和项目列表
export function projectQueryProjectsAndSchools () {
  const url = postUrl.projectQueryProjectsAndSchools
  return axios.get(url + '?_=' + Date.now()).then(res => {
    return Promise.resolve(res.data)
  })
}
// 根据条件查询学生信息
export function studentQueryStudentByCondition (data = {}) {
  const url = postUrl.studentQueryStudentByCondition
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 导入excel
export function importImportProjectData (data) {
  const url = postUrl.importImportProjectData
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 批量导入学生得身份证照片
export function studentUploadImage (data) {
  const url = postUrl.studentUploadImage
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
/**
 * 进度查询接口
 */
export function statisticQueryRate (data = {}) {
  const url = postUrl.statisticQueryRate
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
/**
 * 审核修改审核状态
 */
export function studentSaveOrUpdateStudent (data = {}) {
  const url = postUrl.studentSaveOrUpdateStudent
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
/**
 * 根绝学校查询学生信息
 *
 */
export function studentQueryStudentBySchool (data = {}) {
  const url = postUrl.studentQueryStudentBySchool
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}
// 批量下载学生信息
export function downloadDownloadStudentInfo (data = {}) {
  const url = postUrl.downloadDownloadStudentInfo
  return axios.post(url, data, {
    responseType: "arraybuffer"
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
//
export function downloadDownloadStudentInfoByIds (data = {}) {
  const url = postUrl.downloadDownloadStudentInfoByIds
  return axios.post(url,data, {
    responseType: "arraybuffer"
  }).then(res => {
    return Promise.resolve(res.data)
  })
}