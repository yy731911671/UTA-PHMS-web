<template>
  <div class="all-container">
    <div class="container">
      <div class="header">
        <el-button
          type="primary"
          class="createbtn"
          @click="dialogCreateFormVisible = true"
        >Add</el-button
        ><img height="100px" width="500px" style="border-radius: 10px" src="../../../../static/Vital1.png">
      </div>
      <el-table :data="tableData" border class="table">
        <el-table-column prop="vitalSignTime" label="Vital Sign Time" width="150px">
        </el-table-column>
        <el-table-column prop="weight" label="Weight" width="150px">
        </el-table-column>
        <el-table-column prop="height" label="Height" width="150px">
        </el-table-column>
        <el-table-column prop="heartRate" label="Heart Rate" width="150px">
        </el-table-column>
        <el-table-column prop="temperature" label="Temperature" width="150px">
        </el-table-column>
        <el-table-column prop="bloodSugar" label="Blood Sugar" width="150px">
        </el-table-column>
        <el-table-column prop="bloodPressure" label="Blood Pressure" width="150px">
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
        <el-form-item label="Vital Sign Time:" :label-width="formLabelWidth" prop="vitalSignTime">
          <el-input v-model="createForm.vitalSignTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Weight:" :label-width="formLabelWidth" prop="weight">
          <el-input v-model="createForm.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Height:" :label-width="formLabelWidth" prop="height">
          <el-input v-model="createForm.height" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Heart Rate:" :label-width="formLabelWidth" prop="heartRate">
          <el-input v-model="createForm.heartRate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Temperature:" :label-width="formLabelWidth" prop="temperature">
          <el-input v-model="createForm.temperature" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Blood Sugar:" :label-width="formLabelWidth" prop="bloodSugar">
          <el-input v-model="createForm.bloodSugar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Blood Pressure:" :label-width="formLabelWidth" prop="bloodPressure">
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
    <el-dialog title="Edit Medication" :rules="rules" :visible.sync="dialogEditFormVisible">
      <el-form :model="editForm">
        <el-form-item label="Vital Sign Time:" :label-width="formLabelWidth" prop="vitalSignTime">
          <el-input v-model="editForm.vitalSignTime" autocomplete="off" disabled prop="vitalSignTime"></el-input>
        </el-form-item>
        <el-form-item label="Weight:" :label-width="formLabelWidth" prop="weight">
          <el-input v-model="editForm.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Height:" :label-width="formLabelWidth" prop="height">
          <el-input v-model="editForm.height" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Heart Rate:" :label-width="formLabelWidth" prop="heartRate">
          <el-input v-model="editForm.heartRate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Temperature:" :label-width="formLabelWidth" prop="temperature">
          <el-input v-model="editForm.temperature" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Blood Sugar:" :label-width="formLabelWidth" prop="bloodSugar">
          <el-input v-model="editForm.bloodSugar" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="Blood Pressure:" :label-width="formLabelWidth" prop="bloodPressure">
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
        <ve-line :data="chartData2" :extend="chartExtend2" ref="chartline2" width="600px" height="400px"></ve-line>
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
      this.chartExtend2 = {
        series: {
          smooth: false,  // 将曲线变为直线
          type: 'line'
        },
        color:['#E4004F','#64C9FA']
      }
      return {
        chartData:{
          columns:[],
          rows:[]
        },
        chartData2:{
          columns:[],
          rows:[]
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
        formLabelWidth: '130px',
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
          let row = [],row2=[]
          res.data.forEach(item=>{
            row.push({'date': item.vitalSignTime, 'blood pressure': item.bloodPressure})
            row2.push({'date': item.vitalSignTime, 'blood sugar': item.bloodSugar})
          })
          console.log(row)
          this.tableData = [...res.data];//vitalSignTime,bloodPressure
          this.chartData = {}
          this.chartData2 ={}
          this.chartData={
            columns:['date', 'blood pressure'],
            rows:row
          }
          this.chartData2={
            columns:['date', 'blood sugar'],
            rows:row2
          }
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
  }
  .container {
    margin: 0 auto;
  }
.table{
  margin-left: 100px;
  width: 90%;
}
  .header{
    display: flex;
    width: 100%;
    align-items: end;
  }
  .createbtn {
    margin:20px 20px 20px 100px;
    height: fit-content;
  }
  .el-input {
    width: 90%;
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
