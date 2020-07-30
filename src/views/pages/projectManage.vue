<template>
  <div class="projectManage" v-loading="fullLoading">
    <div class="search">
      <el-input size="small" v-model.trim="projectName" placeholder="请输入项目名称" class="inlineBlock" style="width:300px"></el-input>
      <el-button size="small" type="primary" @click="userQueryUserByCondition(Condition)" style="margin-left:10px;" icon="el-icon-search" round>查询</el-button>
    </div>
    <div style="padding: 10px 0;">
      <el-button size="small" type="primary" @click="startAddProject">新增项目</el-button>
    </div>
    <div class="tableBox">
      <el-table
        ref="singleTable"
        :data="projectList"
        stripe
        border
        size="small"
        height="calc(100vh - 200px)"
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
          property="projectName"
          label="项目名称">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.projectStatus | stateFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="operate">
      
      <el-pagination
        style="float:right"
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
      :title="operateName"
      :visible.sync="addProjectFlag"
      width="350">
      <div class="baseLine">
        <label>项目名称：</label>
        <el-input size="small" v-model.trim="project.projectName" placeholder="请输入用户名" class="inlineBlock" style="width:300px" :disabled="operateName == '编辑'"></el-input>
      </div>
      <div class="baseLine">
        <label>状态：</label>
        <el-select size="small" v-model="project.projectStatus" placeholder="请选择" style="width:300px">
          <el-option
            v-for="item in stateList"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addProjectFlag = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addProject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { projectSaveOrUpdateProject, projectQueryProjectByCondition } from 'api/main'
  export default {
    data () {
      return {
        operateName: '',
        projectName: '',
        addProjectFlag: false,
        projectList: [],
        stateList: [
          {name: '开启', value: '0'},
          {name: '关闭', value: '1'}
        ],
        project: {
          projectName: '',
          projectStatus: '0'
        },
        currentPage: 1,
        pageSize: 20,
        total: 0,
        fullLoading: false
      }
    },
    created () {
      this.userQueryUserByCondition()
    },
    methods: {
      async userQueryUserByCondition () {
        const data = {
          projectName: this.projectName,
          pageSize: this.pageSize,
          page: this.currentPage
        }
        this.fullLoading = true
        let res = await projectQueryProjectByCondition(data)
        this.fullLoading = false
        if (res.code == 0) {
          console.log(res)
          this.projectList = res.data
        } else {
          this.$message.error(res.message)
        }
      },
      startAddProject () {
        this.operateName = '新增项目'
        this.addProjectFlag = true
      },
      edit (item) {
        this.operateName = '编辑'
        this.project = JSON.parse(JSON.stringify(item))
        this.addProjectFlag = true
      },
      async addProject () {
        const data = {
          projectName: this.project.projectName,
          projectStatus: this.project.projectStatus
        }
        if (this.operateName == '编辑') {
          data.id = this.project.id
        }
        let res = await projectSaveOrUpdateProject(data)
        if (res.code == 0) {
          if (this.operateName == '编辑') {
            for (let item of this.projectList) {
              if (item.id == this.project.id) {
                item.projectStatus = this.project.projectStatus
              }
            }
          } else {
            console.log('4567890')
            this.userQueryUserByCondition()
          }
          this.addProjectFlag = false
          this.$message.success('操作成功')
        } else {
          this.$message.error(res.message)
        }
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.userQueryUserByCondition()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.userQueryUserByCondition()
      }
    },
    filters: {
      stateFilter (state) {
        if (state == 0) {
          return '开启'
        } else {
          return '关闭'
        }
      }
    }
  }
</script>
<style scoped>
.operate{
  margin-top:10px;
}
.search{
  /* margin-bottom:10px; */
}
label{
  display: inline-block;
  width:70px;
}
</style>