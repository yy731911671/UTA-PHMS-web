<template>
  <div class="all-container">
    <div class="container">
      <el-button
        type="primary"
        class="createbtn"
        @click="dialogCreateFormVisible = true"
      >Add</el-button
      >
      <el-table :data="tableData" border class="table">
        <el-table-column prop="vitalSignTime" label="Vital Sign Time" width="200px">
        </el-table-column>
        <el-table-column prop="weight" label="Weight" width="200px">
        </el-table-column>
        <el-table-column prop="height" label="Height" width="200px">
        </el-table-column>
        <el-table-column prop="heartRate" label="Heart Rate" width="200px">
        </el-table-column>
        <el-table-column prop="temperature" label="Temperature" width="200px">
        </el-table-column>
        <el-table-column prop="bloodSugar" label="Blood Sugar" width="200px">
        </el-table-column>
        <el-table-column prop="bloodPressure" label="Blood Pressure" width="200px">
        </el-table-column>
        <el-table-column label="Operate" width="150px">
          <template slot-scope="scope">
            <el-button
              @click="handleEditClick(scope.row)"
              type="text"
              size="small"
            >edit</el-button
            >
            <el-button
              @click="handleDeleteClick(scope.row)"
              type="text"
              size="small"
            >delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="Add Vital Sign":visible.sync="dialogCreateFormVisible">
      <el-form :model="createForm" :rules="rules" ref="createForm">
        <el-form-item label="Vital Sign Time:" :label-width="formLabelWidth">
          <el-input v-model="createForm.vitalSignTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Weight:" :label-width="formLabelWidth">
          <el-input v-model="createForm.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Height:" :label-width="formLabelWidth">
          <el-input v-model="createForm.height" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Heart Rate:" :label-width="formLabelWidth">
          <el-input v-model="createForm.heartRate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Temperature:" :label-width="formLabelWidth">
          <el-input v-model="createForm.temperature" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Blood Sugar:" :label-width="formLabelWidth">
          <el-input v-model="createForm.bloodSugar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Blood Pressure:" :label-width="formLabelWidth">
          <el-input v-model="createForm.bloodPressure" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleCreateSubmit()"
        >Submit</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="Edit Medication" :visible.sync="dialogEditFormVisible">
      <el-form :model="editForm">
        <el-form-item label="Vital Sign Time:" :label-width="formLabelWidth">
          <el-input v-model="editForm.vitalSignTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Weight:" :label-width="formLabelWidth">
          <el-input v-model="editForm.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Height:" :label-width="formLabelWidth">
          <el-input v-model="editForm.height" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Heart Rate:" :label-width="formLabelWidth">
          <el-input v-model="editForm.heartRate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Temperature:" :label-width="formLabelWidth">
          <el-input v-model="editForm.temperature" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Blood Sugar:" :label-width="formLabelWidth">
          <el-input v-model="editForm.bloodSugar" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="Blood Pressure:" :label-width="formLabelWidth">
          <el-input v-model="editForm.bloodPressure" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleEditSubmit()"
        >Submit</el-button
        >
      </div>
    </el-dialog>
    <div class="chartBox">
      <div>
        <div class="title">vital line graph:</div>
        <ve-line :data="chartData" :extend="chartExtend" ref="chartline" width="600px" height="400px"></ve-line>
      </div>
      <div style="margin-top:30px">
        <img height="300px" style="border-radius: 10px" src="../../../../static/Vital.png">
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getVitalSignList,
    createVitalSign,
    deleteVitalSign,
    editVitalSign,
  } from "../../../api/vitalsign";
  import { Message } from 'element-ui'
  export default {
    name: "index",
    data() {
      this.chartSettings = {
        roseType: 'radius'
      }
      this.chartExtend = {
        series: {
          smooth: false,  // 将曲线变为直线
          type: 'line'
        },
        color:['#E4004F','#64C9FA']
      }
      return {
        chartData:{
          columns:['日期', '销售额-1季度', '销售额-2季度'],
          rows:[
            {'日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 3523},
            {'日期': '1月2日', '销售额-1季度': 3533, '销售额-2季度': 1232},
            {'日期': '1月3日', '销售额-1季度': 2523, '销售额-2季度': 9768},
            {'日期': '1月4日', '销售额-1季度': 4588, '销售额-2季度': 5252},
            {'日期': '1月5日', '销售额-1季度': 5632, '销售额-2季度': 2536},
            {'日期': '1月6日', '销售额-1季度': 6773, '销售额-2季度': 4454},
          ]
        },

        tableData: [],
        dialogCreateFormVisible: false,
        dialogEditFormVisible: false,
        createForm: {
          vitalSignTime: "",
          weight: "",
          height: "",
          heartRate: "",
          temperature: "",
          bloodSugar: "",
          bloodPressure: ""
        },
        editForm: {
          id: '',
          vitalSignTime: "",
          weight: "",
          height: "",
          heartRate: "",
          temperature: "",
          bloodSugar: "",
          bloodPressure: ""
        },
        formLabelWidth: '150px',
        rules: {
          vitalSignTime: [
            {required: true, message: "Please enter vital sign time", trigger: 'blur'},
          ],
          weight: [
            {required: true, message: "Please enter weight", trigger: 'blur'},
          ],
          height: [
            {required: true, message: "Please enter height", trigger: 'blur'},
          ],
          heartRate: [
            {required: true, message: "Please enter heart rate", trigger: 'blur'},
          ],
          temperature: [
            {required: true, message: "Please enter temperature", trigger: 'blur'},
          ],
          bloodSugar: [
            {required: true, message: "Please enter blood sugar", trigger: 'blur'},
          ],
          bloodPressure: [
            {required: true, message: "Please enter blood pressure", trigger: 'blur'},
          ]
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        getVitalSignList().then((res) => {
          console.log(res.data)
          this.tableData = [...res.data];
          let primary = 0,intermediate=0,senior=0
          this.chartData =[]
          this.chartData= {
            columns: ['type', 'count'],
            rows: [
              { type: 'primary', count: primary },
              { type: 'intermediate', count: intermediate },
              { type: 'senior', count: senior }
            ]
          }
          console.log(this.chartExtend.graphic[0].style)
          this.chartExtend.graphic[0].style.text=this.tableData.length
        });
      },
      handleDeleteClick(row) {
        deleteVitalSign(row.id).then((res) => {
          Message.success("Successfully deleted")
          this.getList();
        });
      },
      clearCreateForm() {
        this.createForm = {
          vitalSignTime: "",
          weight: "",
          height: "",
          heartRate: "",
          temperature: "",
          bloodSugar: "",
          bloodPressure: ""
        }
      },
      clearEditForm() {
        this.editForm = {
          id: '',
          vitalSignTime: "",
          weight: "",
          height: "",
          heartRate: "",
          temperature: "",
          bloodSugar: "",
          bloodPressure: ""
        }
      },
      handleCreateSubmit() {
        this.$refs['createForm'].validate((valid) => {
          if (valid) {
            createVitalSign(this.createForm).then( res => {
              this.dialogCreateFormVisible = false;
              Message.success("Created successfully")
              this.clearCreateForm();
              this.getList();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      handleEditClick(row) {
        this.editForm = {
          id: row.id,
          vitalSignTime: row.vitalSignTime,
          weight: row.weight,
          height: row.height,
          heartRate: row.heartRate,
          temperature: row.temperature,
          bloodSugar: row.bloodSugar,
          bloodPressure: row.bloodPressure
        };
        this.dialogEditFormVisible = true;
      },
      handleEditSubmit() {
        editVitalSign(this.editForm).then(res => {
          this.dialogEditFormVisible = false;
          Message.success("Successfully modified")
          this.clearEditForm();
          this.getList();
        })
      }
    },
  };
</script>

<style scoped>
  .all-container{
    width: 100%;
    height: 150vh;
  }
  .container {
    width: 1550px;
    margin: 0 auto;
  }

  .createbtn {
    margin: 20px 0;
  }
  .chartBox{
    display: flex;
    justify-content: center;
    background: #FFFFFF;
  }
  .title{
    color:seagreen;
    margin-top: 20px;
  }
</style>
