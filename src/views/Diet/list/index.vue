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
        <el-table-column prop="name" label="Name" width="200px">
        </el-table-column>
        <el-table-column prop="emailAddress" label="Email" width="200px">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="Phone" width="200px">
        </el-table-column>
        <el-table-column label="Level" width="150px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.grade==1?'info':scope.row.grade==2?'':'success'" effect="dark">{{scope.row.grade==1?'primary':scope.row.grade==2?'intermediate':'senior'}}</el-tag>
          </template>
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
    <el-dialog title="Add Communication":visible.sync="dialogCreateFormVisible">
      <el-form :model="createForm" :rules="rules" ref="createForm">
        <el-form-item label="Name:" :label-width="formLabelWidth" prop="name">
          <el-input v-model="createForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email:" :label-width="formLabelWidth"  prop="emailAddress">
          <el-input v-model="createForm.emailAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone:" :label-width="formLabelWidth">
          <el-input v-model="createForm.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Level:" prop="grade" :label-width="formLabelWidth">
          <el-select v-model="editForm.grade" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        <el-form-item label="Disease" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Doctor name" :label-width="formLabelWidth">
          <el-input v-model="editForm.emailAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone" :label-width="formLabelWidth">
          <el-input v-model="editForm.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Level" :label-width="formLabelWidth">
          <el-select v-model="editForm.grade" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
      <div style="margin-top:30px">
        <img height="300px" width="600px" style="border-radius: 10px" src="../../../../static/diet.png">
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getCommunications,
    createCommunication,
    deleteCommunication,
    editCommunication,
  } from "../../../api/communication";
  import { Message } from 'element-ui'
  export default {
    name: "index",
    data() {
      return {
        options: [{
          value: 1,
          label: 'primary'
        }, {
          value: 2,
          label: 'intermediate'
        }, {
          value: 3,
          label: 'senior'
        }],
        chartSettings: {
          label: { show: false }
        },
        chartExtend: {
          legend: { show: false },
          graphic: [{
            type: 'text',
            left: 'center',
            top: '45%',
            style: {
              text: 7,
              textAlign: 'center',
              fill: '#000',
              fontSize: 28,
            }
          }, {
            type: 'text',
            left: 'center',
            top: '55%',
            style: {
              text: 'Doctor',
              textAlign: 'center',
              fill: '#999999',
              fontSize: 16,
            }
          }],
          color: ['#909399','#409eff', '#67c23a']
        },
        chartData: {},
        tableData: [],
        dialogCreateFormVisible: false,
        dialogEditFormVisible: false,
        createForm: {
          emailAddress: "",
          name: "",
          phoneNumber: "",
          grade:1
        },
        editForm: {
          id: '',
          emailAddress: "",
          name: "",
          phoneNumber: "",
          grade:1
        },
        formLabelWidth: '150px',
        rules: {
          name: [
            {required: true, message: "Please enter doctor's name", trigger: 'blur'},
          ],
          emailAddress: [
            {required: true, message: "Please enter doctor's email", trigger: 'blur'},
          ],
          grade: [
            {required: true, message: "Please enter doctor's level", trigger: 'blur'},
          ],
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        getCommunications().then((res) => {
          console.log(res.data)
          this.tableData = [...res.data];
          let primary = 0,intermediate=0,senior=0
          this.tableData.forEach(item=>{
            if(item.grade==1){
              primary++
            }else if(item.grade==2){
              intermediate++
            }else {
              senior++
            }
          })
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
        deleteCommunication(row.id).then((res) => {
          Message.success("Successfully deleted")
          this.getList();
        });
      },
      clearCreateForm() {
        this.createForm = {
          emailAddress: "",
          name: "",
          phoneNumber: "",
          grade:''
        }
      },
      clearEditForm() {
        this.editForm = {
          id: '',
          emailAddress: "",
          name: "",
          phoneNumber: "",
          grade:''
        }
      },
      handleCreateSubmit() {
        this.$refs['createForm'].validate((valid) => {
          if (valid) {
            createCommunication(this.createForm).then( res => {
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
          name: row.name,
          emailAddress: row.emailAddress,
          phoneNumber: row.phoneNumber,
          grade:row.grade
        };
        this.dialogEditFormVisible = true;
      },
      handleEditSubmit() {
        editCommunication(this.editForm).then(res => {
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
    width: 900px;
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
    margin-left: 50px;
  }
</style>
