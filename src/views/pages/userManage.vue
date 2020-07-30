<template>
  <div class="userManage" v-loading="fullLoading">
    <!-- <Nav>用户管理</Nav> -->
    <div class="search">
      <el-input size="small" v-model.trim="Condition" placeholder="请输入用户名" class="inlineBlock" style="width:300px"></el-input>
      <el-button size="small" type="primary" @click="userQueryUserByCondition(Condition)" style="margin-left:10px;" icon="el-icon-search" round>查询</el-button>
    </div>
    <div style="padding-top:10px;">
      <el-button size="small" type="primary" @click="addUserFlag = true" icon="el-icon-circle-plus-outline">新增用户</el-button>
    </div>
    <div class="tableBox">
      <el-table
        ref="singleTable"
        :data="userList"
        stripe
        border
        size="small"
        height="calc(100vh - 210px)"
        :highlight-current-row="true"
        :header-cell-class-name="headerCellClass"
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
          property="userCode"
          label="用户名">
        </el-table-column>
        <el-table-column
          property="rank"
          label="等级">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.state | stateFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="operate">
      
      <el-pagination
        size="small"
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
      title="新增用户"
      :visible.sync="addUserFlag"
      width="350">
      <div class="baseLine" style="">
        <label>用户名：</label>
        <el-input size="small" v-model.trim="user.username" placeholder="请输入用户名" class="inlineBlock" style="width:300px"></el-input>
      </div>
      <div class="baseLine">
        <label>密码：</label>
        <el-input size="small" v-model.trim="user.password" placeholder="请输入密码" show-password class="inlineBlock" style="width:300px"></el-input>
      </div>
      <div class="baseLine">
        <label>等级：</label>
        <el-select size="small" v-model="user.rank" placeholder="请选择" style="width:300px">
          <el-option
            v-for="item in rankList"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addUserFlag = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="editUserFlag"
      width="350">
      <div class="baseLine">
        <label>用户名：</label>
        <el-input v-model.trim="changingObj.userCode" placeholder="请输入用户名" class="inlineBlock" style="width:300px" :disabled="true"></el-input>
      </div>
      <div class="baseLine">
        <label>状态：</label>
        <!-- <el-input v-model.trim="changingObj.state" placeholder="请输入密码" show-password class="inlineBlock" style="width:300px"></el-input> -->
        <el-select v-model="changingObj.state" placeholder="请选择" style="width:300px">
          <el-option
            v-for="item in stateList"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="baseLine">
        <label>等级：</label>
        <el-select v-model="changingObj.rank" placeholder="请选择" style="width:300px">
          <el-option
            v-for="item in rankList"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editUserFlag = false">取 消</el-button>
        <el-button size="small" type="primary" @click="changeUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { userSaveOrUpdateUser, userQueryUserByCondition } from 'api/main'
  // import Nav from "@/components/nav"
  export default {
    components: {
      // Nav
    },
    data () {
      return {
        userList: [],
        fullLoading: false,
        addUserFlag: false,
        editUserFlag: false,
        Condition: '',
        rankList: [
          {name: '1', value: '1'},
          {name: '2', value: '2'}
        ],
        stateList: [
          {name: '有效', value: '1'},
          {name: '无效', value: '0'},
        ],
        user: {
          username: '',
          password: '',
          rank: '1'
        },
        changingObj: {},
        currentPage: 1,
        pageSize: 20,
        total: 0
      }
    },
    watch: {
      addUserFlag(val) {
        if (!val) {
          this.user.username = ''
          this.user.password = ''
        }
      }
    },
    filters: {
      stateFilter(val) {
        if (val == 1) {
          return '有效'
        } else {
          return '无效'
        }
      }
    },
    methods: {
      edit(item){
        this.changingObj = item
        this.editUserFlag = true
      },
      async addUser () {
        if (!this.user.username) {
          this.$message.warning('请输入用户名')
          return false
        }
        if (!this.user.password) {
          this.$message.warning('请输入密码')
          return false
        }
        const data = {
          userCode: this.user.username,
          userName: this.user.username,
          password: this.user.password,
          rank: '1',
          state: '1' // 0无效 1有效
        }
        let res = await userSaveOrUpdateUser(data)
        if (res.code == 0) {
          this.addUserFlag = false
          this.$message.success('操作成功')
          this.userQueryUserByCondition(this.Condition)
        } else {
          this.$message.error(res.message)
        }
      },
      // 查询用户列表
      async userQueryUserByCondition (code = '') {
        const data = {
          userCode: code,
          pageSize: this.pageSize,
          page: this.currentPage
        }
        this.fullLoading = true
        let res = await userQueryUserByCondition(data)
        this.fullLoading = false
        if (res.code == 0) {
          console.log(res)
          this.userList = res.data
        } else {
          this.$message.error(res.message || '系统异常')
        }
      },
      // 修改用户
      async changeUser () {
        const data = {
          id: this.changingObj.id,
          userName: this.changingObj.userCode,
          userCode: this.changingObj.userCode,
          password: this.changingObj.password,
          rank: this.changingObj.rank,
          state: this.changingObj.state // 0无效 1有效
        }
        let res = await userSaveOrUpdateUser(data)
        if (res.code == 0) {
          this.$message.success('修改成功')
          this.editUserFlag = false
        } else {
          this.$message.error(res.message)
        }
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.userQueryUserByCondition(this.Condition)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.userQueryUserByCondition(this.Condition)
      },
      headerCellClass (row, column, rowIndex, columnIndex) {
        console.log(row, column, rowIndex, columnIndex)
        return 'boldHeader'
      }
    },
    mounted () {
      this.userQueryUserByCondition()
    }
  }
</script>
<style scoped>
.operate{
  margin-top:10px;
}
label{
  display: inline-block;
  width:70px;
}
.tableBox{
  margin-top: 10px;
}
.search{
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.baseLine{
  text-align:center;margin:10px auto;
}
.baseLine label{
  text-align: right;
}
.boldHeader{
  font-weight: bold;
}
</style>