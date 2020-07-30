<template>
  <div class="studentImport">
    <div class="search">
      <el-row class="row">
        <el-col :span="8">
          <label for="">项目：</label>
          <el-select size="small" v-model="queryStudent.projectId" placeholder="请选择项目" class="inlineBlock">
            <el-option
              v-for="item in projects"
              :key="item.id"
              :label="item.projectName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <label for="">学校：</label>
          <el-select size="small" v-model="queryStudent.schoolId" placeholder="请选择学校" class="inlineBlock">
            <el-option
              v-for="item in schools"
              :key="item.id"
              :label="item.schoolName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <label for="">姓名：</label>
          <el-input size="small" v-model="queryStudent.studentName" placeholder="请输入姓名" class="inlineBlock"></el-input>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8">
          <label for="">手机号：</label>
          <el-input size="small" v-model="queryStudent.mobile" placeholder="请输入手机号" class="inlineBlock"></el-input>
        </el-col>
        <el-col :span="8">
          <label for="">审核状态：</label>
          <el-select size="small" v-model="queryStudent.exanineStatus" placeholder="请选择审核状态" class="inlineBlock">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button size="small" type="primary" @click="studentQueryStudentByCondition" icon="el-icon-search" round>查询</el-button>
          <el-button size="small" type="primary" @click="clearData">清除</el-button>
          <!-- <el-button type="primary" plain @click="uploadData = true">数据导入</el-button> -->
          <el-dropdown style="margin-left:10px;">
            <el-button type="text">数据操作
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" :split-button="true">
              <el-dropdown-item @click.native="downLoadTemplate">模板下载</el-dropdown-item>
              <el-dropdown-item @click.native="uploadData = true">数据导入</el-dropdown-item>
              <el-dropdown-item @click.native="uploadImgFlag = true">证件上传</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <a href="static/template.xlsx" download id="download" style="width:0;height:0;"></a>
      </el-row>
    </div>
    <div class="tableBox">
      <el-table
        ref="singleTable"
        :data="studentList"
        stripe
        border
        size="small"
        height="calc(100vh - 240px)"
        style="width: 100%">
        <el-table-column
          property="index"
          width="80"
          label="序号">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column
          property="studentName"
          label="姓名">
        </el-table-column>
        <el-table-column
          property="idCard"
          label="证件号码">
        </el-table-column>
        <el-table-column
          property="projectName"
          label="项目">
        </el-table-column>
        <el-table-column
          property = "schoolName"
          label="学校">
        </el-table-column>
        <el-table-column
          property = "mobile"
          label="手机号">
        </el-table-column>
        <el-table-column
          label="图片状态">
          <!--oldImagePath-->
          <template slot-scope="scope">
            {{scope.row.oldImagePath ? '已上传': '未上传'}}
          </template>
        </el-table-column>
        <el-table-column
          label="支付状态">
          <template slot-scope="scope">
            {{scope.row.payStatus == '0' ? '未支付' : scope.row.payStatus == '1' ? '已支付' : '支付失败'}}
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态">
          <!--examineStatus 1已审核 0未审核-->
          <template slot-scope="scope">
            {{scope.row.examineStatus == '1' ? '已审核': scope.row.examineStatus == '0'? '未审核': ''}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">查看详情</el-button>
            <!-- <el-button type="text" size="small" @click="edit(scope.row)" v-if="scope.row.oldImagePath">审核</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="self_pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[20, 30, 40, 50]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="数据导入"
      :visible.sync="uploadData"
      width="500px"
      center
      style="text-align:center;">
      <div>
        <label for="">项目：</label>
        <el-select size="small" v-model="upload.projectId" placeholder="请选择项目" class="inlineBlock" style="margin-right:10px;">
          <el-option
            v-for="item in projects"
            :key="item.id"
            :label="item.projectName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div>
        <label>模板：</label>
        <span class="inlineBlock">
          <span style="margin:0 10px;" v-if="uploadFileName">{{uploadFileName}}</span>
          <el-button type="text" @click="deleteUploadFile" v-if="uploadFileName">删除</el-button>
          <el-button type="text" @click="uploadxlsx" v-if="!uploadFileName">上传</el-button>
          <input type="file" id="uploadFile" style="display:none;" @change="uploadxlsxChange">
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="uploadData = false">取 消</el-button>
        <el-button size="small" type="primary" @click="startUpload">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="证件上传"
      :visible.sync="uploadImgFlag"
      width="500px"
      center
      style="text-align:center;">
      <div>
        <label for="">项目：</label>
        <el-select size="small" v-model="uploadImg.projectId" placeholder="请选择项目" class="inlineBlock" style="margin-right:10px;">
          <el-option
            v-for="item in projects"
            :key="item.id"
            :label="item.projectName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div style="margin: 10px 0;">
        <label for="" >学校：</label>
        <el-select size="small" v-model="uploadImg.schoolId" placeholder="请选择项目" class="inlineBlock" style="margin-right:10px;">
          <el-option
            v-for="item in schools"
            :key="item.id"
            :label="item.schoolName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div>
        <label>图片：</label>
        <span class="inlineBlock">
          <span style="margin:0 10px;" v-if="uploadImgName">{{uploadImgName}}</span>
          <el-button type="text" @click="deleteUploadFile" v-if="uploadImgName">删除</el-button>
          <el-button type="text" @click="uploadImgs" v-if="!uploadImgName">上传</el-button>
          <input type="file" id="uploadImgFile" multiple="multiple" style="display:none;" @change="uploadImgChange">
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="uploadData = false">取 消</el-button>
        <el-button size="small" type="primary" @click="startUploadImg">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="查看详情"
      :visible.sync="detailFlag"
      width="500px"
      center
      style="text-align:center;">
      <div class="detailtLine">
        <label for="">姓名</label>
        <span class="detailValue">{{defailObj.studentName}}</span>
      </div>
      <div class="detailtLine">
        <label for="">性别</label>
        <span class="detailValue">{{defailObj.sex}}</span>
      </div>
      <div class="detailtLine">
        <label for="">身份号码</label>
        <span class="detailValue">{{defailObj.idCard}}</span>
      </div>
      <div class="detailtLine">
        <label for="">学校</label>
        <span class="detailValue">{{defailObj.schoolName}}</span>
      </div>
      <div class="detailtLine">
        <label for="">手机号</label>
        <span class="detailValue">{{defailObj.mobile}}</span>
      </div>
      <div class="detailtLine">
        <label for="">图片状态</label>
        <span class="detailValue">{{defailObj.newImagePath ? '已上传': '未上传'}}</span>
      </div>
      <div class="detailtLine" v-if="defailObj.newImagePath">
        <label for="">对比图片</label>
        <img class="detailValue" :src="defailObj.newImagePath" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="detailFlag = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    projectQueryProjectsAndSchools,
    studentQueryStudentByCondition,
    importImportProjectData,
    studentUploadImage
  } from 'api/main'
  export default {
    data () {
      return {
        input: '',
        value: '',
        uploadData: false,
        options: [],
        projects: [],
        schools: [],
        studentList: [],
        currentPage: 1,
        total: 0,
        pageSize: 20,
        queryStudent: {
          projectId: '',
          schoolId: '',
          idCard: '',
          studentName: '',
          mobile: '',
          exanineStatus: ''
        },
        upload: {
          projectId: ''
        },
        uploadImg: {
          projectId: '',
          schoolId: ''
        },
        uploadFileName: '',
        uploadImgName: '',
        uploadImgFlag: false,
        detailFlag: false,
        defailObj: {}
      }
    },
    created () {
      this.projectQueryProjectsAndSchools()
      this.studentQueryStudentByCondition()
    },
    methods: {
      async projectQueryProjectsAndSchools () {
        let res = await projectQueryProjectsAndSchools({})
        if (res.code == 0) {
          console.log(res)
          this.projects = res.data.projects
          this.schools = res.data.schools
        } else {
          this.$message.error(res.message)
        }
      },
      async studentQueryStudentByCondition () {
        const data = {
          page: this.currentPage,
          pageSize: this.pageSize,
          ...this.queryStudent
        }
        let res = await studentQueryStudentByCondition(data)
        if (res.code == 0) {
          console.log(res)
          this.studentList = res.data
        } else {
          this.$message.error(res.message)
        }
      },
      downLoadTemplate () {
        this.$nextTick(() => {
          document.getElementById("download").click()
        })
      },
      handleSizeChange () {
        this.studentQueryStudentByCondition()
      },
      handleCurrentChange () {
        this.studentQueryStudentByCondition()
      },
      uploadxlsx () {
        this.$nextTick(() => {
          document.getElementById('uploadFile').click()
        })
      },
      uploadxlsxChange () {
        this.uploadFileName = document.getElementById('uploadFile').files[0].name
      },
      deleteUploadFile () {
        this.uploadFileName = ""
        document.getElementById('uploadFile').value = ""
      },
      async startUpload () {
        if (!this.upload.projectId) {
          this.$message.error('请选择项目')
          return false
        }
        if (!this.uploadFileName) {
          this.$message.error('请选择数据模板')
          return false
        }
        const formData = new FormData()
        let file = document.getElementById("uploadFile").files[0]
        formData.append('projectId', this.upload.projectId)
        formData.append('file', file)
        let res = await importImportProjectData(formData)
        if (res.code == 0) {
          this.$message.success('导入成功')
          this.uploadData = false
        } else {
          this.$message.error(res.message)
        }
      },
      async startUploadImg () {
        const formData = new FormData()
        if (!this.uploadImg.projectId) {
          this.$message.error('请选择项目')
          return false
        }
        if (!this.uploadImg.schoolId) {
          this.$message.error('请选择学校')
          return false
        }
        if (!document.getElementById("uploadImgFile").value) {
          this.$message.error('请选择图片')
          return false
        }
        let files = document.getElementById("uploadImgFile").files
        // console.log(files, "files")
        formData.append('projectId', this.uploadImg.projectId)
        formData.append('schoolId', this.uploadImg.schoolId)
        formData.append('dataFlag', '1')
        
        for (let i = 0; i < files.length; i++) {
          // arr.push(files[i])
          formData.append('files', files[i])
        }
        // formData.append('files', arr)
        let res = await studentUploadImage(formData)
        if (res.code == 0) {
          this.$message.success('导入成功')
          document.getElementById("uploadImgFile").value = ""
          this.uploadImgFlag = false
        } else {
          this.$message.error(res.message)
        }
      },
      uploadImgChange () {
        
      },
      clearData () {
        this.queryStudent.projectId = ""
        this.queryStudent.schoolId = ""
        this.queryStudent.studentName = ""
        this.queryStudent.mobile = ""
        this.queryStudent.exanineStatus = ""
      },
      uploadImgs () {
        this.$nextTick(() => {
          document.getElementById("uploadImgFile").click()
        })
      },
      edit (item) {
        this.defailObj = JSON.parse(JSON.stringify(item))
        this.detailFlag = true
      }
    }
  }
</script>
<style scoped>
.search .row{
  margin-bottom: 10px;
  font-size: 14px;
}
.inlineBlock{
  width: 250px;
}
label{
  width:80px;
  display: inline-block;
}
.tableBox{
  margin-top: 10px;
}
.self_pagination{
  margin-top:20px;
  text-align: right;
}
.detailValue{
  display: inline-block;
  width:200px;
  text-align: left;
}
.detailtLine{
  text-align: center;
  /* margin-bottom: 25px; */
  line-height: 30px;
  border: 1px solid #ccc;
  border-bottom: none;
}
.detailtLine:last-child{
  border-bottom: 1px solid #ccc;
}
.detailtLine label{
  border-right: 1px solid #ccc;
  text-align: right;
  padding-right: 5px;
}
.detailtLine .detailValue {
  padding-left: 5px;
}
</style>