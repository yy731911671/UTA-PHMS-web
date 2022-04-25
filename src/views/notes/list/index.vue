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
        <el-table-column prop="title" label="Title" width="150px">
        </el-table-column>
        <el-table-column prop="keyword" label="Keyword" width="200px">
        </el-table-column>
        <el-table-column prop="createTime" label="CreateTime" width="200px">
        </el-table-column>
        <el-table-column prop="updateTime" label="Update Time" width="200px">
        </el-table-column>
        <el-table-column label="Operate" width="150px">
          <template slot-scope="scope">
            <el-button
              @click="handleDetailClick(scope.row)"
              type="text"
              size="small"
            >detail</el-button>
            <el-button
              @click="handleEditClick(scope.row)"
              type="text"
              size="small"
            >edit</el-button>
            <el-button
              @click="handleDeleteClick(scope.row)"
              type="text"
              size="small"
            >delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="Add Notes":visible.sync="dialogCreateFormVisible">
      <el-form :model="createForm" :rules="rules" ref="createForm">
        <el-form-item label="title:" :label-width="formLabelWidth" prop="title">
          <el-input v-model="createForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="keyword:" :label-width="formLabelWidth" prop="keyword">
          <el-input v-model="createForm.keyword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="content:" :label-width="formLabelWidth"  prop="content">
          <el-input v-model="createForm.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleCreateSubmit()"
        >Submit</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="Notes Detail" :visible.sync="dialogDetailFormVisible">
      <div class="detail-title">
        {{DetailInfo.title}}
      </div>
      <div class="extra-wrap">
        <div>username:admin</div>
        <div>updateTime:{{DetailInfo.updateTime}}</div>
      </div>
      <el-card class="box-card">
        {{DetailInfo.content}}
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetailFormVisible = false">Cancel</el-button>
      </div>
    </el-dialog>
    <el-dialog title="Edit Notes" :visible.sync="dialogEditFormVisible">
      <el-form :model="editForm">
        <el-form-item label="Title" :label-width="formLabelWidth">
          <el-input v-model="editForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Keyword" :label-width="formLabelWidth">
          <el-input v-model="editForm.keyword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Content" :label-width="formLabelWidth">
          <el-input v-model="editForm.content" autocomplete="off"></el-input>
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
      <img height="300px" width="900px"style="border-radius: 10px" src="../../../../static/noted.png">
    </div>
  </div>
</template>

<script>
  import {
    getNoteList,
    createNote,
    deleteNote,
    editNote,
  } from "../../../api/note";
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
        tableData: [],
        dialogCreateFormVisible: false,
        dialogEditFormVisible: false,
        dialogDetailFormVisible:false,
        createForm: {
          title: "",
          content: "",
          keyword:""
        },
        DetailInfo : {
          title: "",
          keyword:"",
          content: "",
          updateTime: ""
        },
        editForm: {
          id: '',
          title: "",
          keyword:"",
          content: "",
        },
        formLabelWidth: '150px',
        rules: {
          title: [
            {required: true, message: "Please enter notes's title", trigger: 'blur'},
          ],
          keyword: [
            {required: true, message: "Please enter notes's keyword", trigger: 'blur'},
          ],
          content: [
            {required: true, message: "Please enter notes's content", trigger: 'blur'},
          ],
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        getNoteList().then((res) => {
          // content: "This is content1"
          // createTime: "2022-04-22 22:37:42"
          // id: 16
          // time: "2022-4-22"
          // title: "This is title1"
          // updateTime: "2022-04-22 22:37:42"
          this.tableData = [...res.data];
          console.log(res.data)
        });
      },
      handleDeleteClick(row) {
        deleteNote(row.id).then((res) => {
          Message.success("Successfully deleted")
          this.getList();
        });
      },
      clearCreateForm() {
        this.createForm = {
          title: "",
          content: "",
          keyword: ""
        }
      },
      clearEditForm() {
        this.editForm = {
          id: '',
          title: "",
          content: "",
          keyword: ""
        }
      },
      handleCreateSubmit() {
        this.$refs['createForm'].validate((valid) => {
          if (valid) {
            createNote(this.createForm).then( res => {
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
      handleDetailClick(row){
        this.DetailInfo = {
          id: row.id,
          title: row.title,
          content: row.content,
          keyword: row.keyword,
          updateTime:row.updateTime
        };
        this.dialogDetailFormVisible=true
      },
      handleEditClick(row) {
        this.editForm = {
          id: row.id,
          title: row.title,
          content: row.content,
          keyword: row.keyword
        };
        this.dialogEditFormVisible = true;
      },
      handleEditSubmit() {
        editNote(this.editForm).then(res => {
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
    width: 1050px;
    margin: 0 auto;
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
  }

  .createbtn {
    margin: 20px 0;
  }
  .chartBox{
    display: flex;
    justify-content: center;
    margin-top:30px
  }
  .title{
    color:seagreen;
    margin-top: 20px;
    margin-left: 50px;
  }
  .el-input {
    width: 90%;
  }
  .el-dialog__body {
    padding: 0px 44px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    background: antiquewhite;
  }
  .detail-title{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: large;
  }
  .extra-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 25px;
  }
  .el-card__body {
    padding: 20px;
    line-height: 20px;
  }
</style>
