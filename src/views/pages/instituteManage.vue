<template>
  <div class="instituteManage" v-loading="fullLoading">
    <div class="search">
      <el-input size="small" v-model.trim="schoolName" placeholder="请输入学校名称" class="inlineBlock" style="width:300px;margin-right:10px;"></el-input>
      <el-button size="small" type="primary" @click="querySchool" icon="el-icon-search" round>查询</el-button>
    </div>
    <div style="padding:10px 0;">
      <el-button size="small" type="primary" @click="addSchoolFlag = true" icon="el-icon-circle-plus-outline">新增院校</el-button>
    </div>
    <div class="tableBox">
      <el-table
        ref="singleTable"
        :data="schoolList"
        stripe
        border
        size="small"
        height="calc(100vh - 220px)"
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
          property="schoolName"
          label="学校名称">
        </el-table-column>
        <el-table-column
          property="price"
          label="价格">
        </el-table-column>
      </el-table>
    </div>
    <div class="operate">
      
      <el-pagination
        style="float:right;"
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
      title="新增学校"
      :visible.sync="addSchoolFlag"
      width="350">
      <div class="baseLine">
        <label>学校名称：</label>
        <el-input size="small" v-model.trim="resgister.schoolName" placeholder="请输入学校名称" class="inlineBlock" style="width:300px"></el-input>
      </div>
      <div class="baseLine">
        <label>价格：</label>
        <el-input size="small" v-model.trim="resgister.price" placeholder="请输入价格" class="inlineBlock" style="width:300px"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addSchoolFlag = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addSchool">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { schoolQuerySchoolByCondition, schoolSaveOrUpdateSchool } from 'api/main'
  export default {
    data () {
      return {
        schoolList: [],
        schoolName: '',
        addSchoolFlag: false,
        resgister: {
          schoolName: '',
          price: ''
        },
        currentPage: 1,
        pageSize: 20,
        total: 0,
        fullLoading: false
      }
    },
    methods: {
      async querySchool () {
        const data = {
          schoolName: this.schoolName,
          pageSize: this.pageSize,
          page: this.currentPage
        }
        this.fullLoading = true
        let res = await schoolQuerySchoolByCondition(data)
        this.fullLoading = false
        if (res.code == 0) {
          this.schoolList = res.data
        } else {
          this.$message.error(res.message)
        }
      },
      async addSchool () {
        const data = {
          schoolName: this.resgister.schoolName,
          price: this.resgister.price,
          delFlag: '0'
        }
        let res = await schoolSaveOrUpdateSchool(data)
        if (res.code == 0) {
          this.addSchoolFlag = false
          this.$message.success('操作成功')
          this.querySchool()
          console.log(res)
        } else {
          this.$message.error(res.message)
        }
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.querySchool()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.querySchool()
      }
    },
    mounted () {
      this.querySchool()
    }
  }
</script>
<style scoped>
.search{
  padding-bottom:10px;
  border-bottom: 1px solid #eee;
}
.operate{
  margin-top:10px;
}
label{
  display: inline-block;
  width:70px;
}
</style>