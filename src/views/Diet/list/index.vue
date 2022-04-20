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
        <el-table-column prop="dietTime" label="Diet Time" width="200px">
        </el-table-column>
        <el-table-column prop="foodName" label="Food Name" width="200px">
        </el-table-column>
        <el-table-column prop="foodWeight" label="Food Weight" width="200px">
        </el-table-column>
        <el-table-column prop="calorieCount" label="Calorie Count" width="200px">
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
    <el-dialog title="Add Diet Item":visible.sync="dialogCreateFormVisible">
      <el-form :model="createForm" :rules="rules" ref="createForm">
        <el-form-item label="Diet Time:" :label-width="formLabelWidth">
          <el-input v-model="createForm.dietTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Food Name:" :label-width="formLabelWidth">
          <el-input v-model="createForm.foodName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Food Weight:" :label-width="formLabelWidth">
          <el-input v-model="createForm.foodWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Calorie Count:" :label-width="formLabelWidth">
          <el-input v-model="createForm.calorieCount" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleCreateSubmit()"
        >Submit</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="Edit Diet Item" :visible.sync="dialogEditFormVisible">
      <el-form :model="editForm">
        <el-form-item label="Diet Time" :label-width="formLabelWidth">
          <el-input v-model="editForm.dietTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Food Name" :label-width="formLabelWidth">
          <el-input v-model="editForm.foodName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Food Weight" :label-width="formLabelWidth">
          <el-input v-model="editForm.foodWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Calorie Count" :label-width="formLabelWidth">
          <el-input v-model="editForm.calorieCount" autocomplete="off"></el-input>
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
    getDietList,
    createDiet,
    deleteDiet,
    editDiet,
  } from "../../../api/diet";
  import { Message } from 'element-ui'
  export default {
    name: "index",
    data() {
      return {
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
          dietTime: "",
          foodName: "",
          foodWeight: "",
          calorieCount: ""
        },
        editForm: {
          id: "",
          dietTime: "",
          foodName: "",
          foodWeight: "",
          calorieCount: ""
        },
        formLabelWidth: '150px',
        rules: {
          dietTime: [
            {required: true, message: "Please enter diet time", trigger: 'blur'},
          ],
          foodName: [
            {required: true, message: "Please enter food name", trigger: 'blur'},
          ],
          foodWeight: [
            {required: true, message: "Please enter food weight", trigger: 'blur'},
          ],
          calorieCount: [
            {required: true, message: "Please enter calorie count", trigger: 'blur'},
          ]
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        getDietList().then((res) => {
          console.log(res.data)
          this.tableData = [...res.data];
          })
      },
      handleDeleteClick(row) {
        deleteDiet(row.id).then((res) => {
          Message.success("Successfully deleted")
          this.getList();
        });
      },
      clearCreateForm() {
        this.createForm = {
          dietTime: "",
          foodName: "",
          foodWeight: "",
          calorieCount: ""
        }
      },
      clearEditForm() {
        this.editForm = {
          id: '',
          dietTime: "",
          foodName: "",
          foodWeight: "",
          calorieCount: ""
        }
      },
      handleCreateSubmit() {
        this.$refs['createForm'].validate((valid) => {
          if (valid) {
            createDiet(this.createForm).then( res => {
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
          dietTime: row.dietTime,
          foodName: row.foodName,
          foodWeight: row.foodWeight,
          calorieCount:row.calorieCount
        };
        this.dialogEditFormVisible = true;
      },
      handleEditSubmit() {
        editDiet(this.editForm).then(res => {
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
