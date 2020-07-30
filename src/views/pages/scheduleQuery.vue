<template>
  <div class="schedule">
    <div class="search">
      <label for="">学校：</label>
      <el-select size="small" v-model="schoolId" placeholder="请选择学校" class="inlineBlock">
        <el-option
          v-for="item in schoolList"
          :key="item.id"
          :label="item.schoolName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button size="small" type="primary" @click="statisticQueryRate" style="margin-left:20px;" icon="el-icon-search" round>查 询</el-button>
    </div>
    <div class="content">
      <!-- <div class="pie">
        <div id="main" style="width:400px;height:300px;">
        </div>
        <div id="main1" style="width:400px;height:300px;">
        </div>
      </div> -->
      <div class="right">
        <el-table
          :data="tableData"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="studentName"
            label="序号"
            width="80">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="项目名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="payStatus"
            label="学校">
            <template slot-scope="scope">
              {{scope.row.payStatus | filterpayStatus}}
            </template>
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="录入数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="已支付数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="审核通过数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="待审核数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="完成率"
            width="180">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {statisticQueryRate, projectQueryProjectsAndSchools, studentQueryStudentBySchool} from "api/main"
  const echarts = require("echarts")
  export default {
    data () {
      return {
        schoolId: "",
        schoolList: [],
        tableData: []
      }
    },
    created () {
      this.projectQueryProjectsAndSchools()
    },
    methods: {
      projectQueryProjectsAndSchools () {
        projectQueryProjectsAndSchools().then(res => {
          if (res.code == 0) {
            this.schoolList = res.data.schools
          } else {
            this.$message.error(res.message)
          }
        })
      },
      statisticQueryRate () {
        const data = {
          schoolId: this.schoolId
        }
        statisticQueryRate(data).then(res => {
          if (res.code == 0) {
            this.initEcahrts(res.data)
            this.initPie(res.data)
          } else {
            this.$message.error(res.message)
          }
        })
      },
      initEcahrts (obj) {
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        var option = {
            // title: {
            //     text: '审核进度比例图'
            // },
            tooltip: {},
            xAxis: {
                data: ['未审核', '审核通过', '审核拒绝']
            },
            yAxis: {},
            series: [{
                name: '审核',
                type: 'bar',
                data: []
            }]
        }
        // option.series[0].data.push(obj.total)
        option.series[0].data.push(obj.notExamineTotal)
        option.series[0].data.push(obj.examinePassTotal)
        option.series[0].data.push(obj.examineRefuseTotal)
        myChart.setOption(option);
        myChart.on('click', params => {
          console.log(params)
          const data = {
            examineStatus: params.seriesIndex,
            schoolId: this.schoolId
          }
          studentQueryStudentBySchool(data).then(res => {
            if (res.code == 0) {
              console.log(res, "res")
              this.tableData = res.data
            } else {
              this.$message.error(res.message)
            }
          })
        })
      },
      initPie (obj) {
        var myChart = echarts.init(document.getElementById('main1'));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                top: 50,
                data: ['未审核', '审核通过', '审核拒绝']
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 0, name: '未审核'},
                        {value: 1, name: '审核通过'},
                        {value: 2, name: '审核拒绝'}
                    ]
                }
            ]
        };
        option.series[0].data[0].value = obj.notExamineTotal
        option.series[0].data[1].value = obj.examinePassTotal
        option.series[0].data[2].value = obj.examineRefuseTotal
        myChart.setOption(option);
        myChart.on('click', function (params) {
          console.log(params, "pie")
        })
      },
      async studentQueryStudentBySchool () {
        const data = {
          "schoolId": 0,
          "payStatus": "",
          "imageStatus": "",
          "examineStatus": "",
          "page": 0,
          "pageSize": 0
        }
        let res = await studentQueryStudentBySchool(data)
        if (res.code == 0) {
          console.log(res)
        } else {
          this.$message.error(res.message)
        }
      }
    },
    mounted () {
      // this.initEcahrts()
    },
    filters: {
      filterexamineStatus (val) {
        if (val == 0) {
          return '未审核'
        }
        if (val == 1) {
          return '审核通过'
        }
        if (val == 2) {
          return '审核拒绝'
        }
      },
      filterpayStatus (val) {
        if (val == 0) {
          return '未支付'
        }
        if (val == 1) {
          return '已支付'
        }
      }
    }
  }
</script>
<style >
/* .content{
  display: flex;
} */
/* .content .pie{
  width: 400px;
} */
/* .content .right{
  flex: 1;
} */
.search{
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
</style>