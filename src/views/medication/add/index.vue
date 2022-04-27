<template>
  <div>
    <div class="container">
      <el-input
        placeholder="disease"
        v-model="disease"
        prefix-icon="el-icon-search"
        class="input"
      >
      </el-input>
      <el-input
        placeholder="doctor name"
        prefix-icon="el-icon-search"
        v-model="doctorName"
        class="input"
      >
      </el-input>
      <el-button type="primary" @click="getListByName()">Search</el-button>
      <el-table :data="tableData" border class="table">
        <el-table-column prop="disease" label="Disease" width="150px">
        </el-table-column>
        <el-table-column prop="doctorName" label="Doctor name" width="150px">
        </el-table-column>
        <el-table-column prop="createTime" label="Consulted time" width="200px">
        </el-table-column>
        <el-table-column
          prop="tabletName"
          label="Medicines prescribed"
          width="200px"
        >
        </el-table-column>
        <el-table-column
          prop="consumptionTime"
          label="Time of consumption"
          width="200px"
        >
        </el-table-column>
        <el-table-column
          prop="doctorFollowUp"
          label="Doctor follow-up"
          width="150px"
        >
        </el-table-column>
        <el-table-column label="Operate" width="100px">
          <template slot-scope="scope">
            <el-button
              @click="handleDetailClick(scope.row)"
              type="text"
              size="small"
            >detail</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="Detail Medication" :visible.sync="dialogDetailFormVisible">
        <el-form :model="DetailInfo">
          <el-form-item label="Disease" :label-width="formLabelWidth">
            <el-input v-model="DetailInfo.disease" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="DoctorName" disabled :label-width="formLabelWidth">
            <el-input v-model="DetailInfo.doctorName" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="TabletName" :label-width="formLabelWidth">
            <el-input v-model="DetailInfo.tabletName" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="consumptionTime" :label-width="formLabelWidth">
            <el-input v-model="DetailInfo.consumptionTime" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="doctorFollowUp" :label-width="formLabelWidth">
            <el-input v-model="DetailInfo.doctorFollowUp" disabled autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDetailFormVisible = false">Cancel</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getMedicationList, getListByDoctorName } from "../../../api/medication";
export default {
  name: "index",
  data() {
    return {
      tableData: [],
      doctorName: '',
      disease:'',
      dialogDetailFormVisible:false,
      DetailInfo : {
        disease: "",
        doctorName:"",
        createTime: "",
        tabletName: "",
        consumptionTime: "",
        doctorFollowUp:''
      },
      formLabelWidth: '150px',
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getMedicationList().then((res) => {
        this.tableData = [...res.data];
      });
    },
    getListByName() {
      if(this.doctorName){
        getListByDoctorName(this.doctorName).then(res => {
          this.tableData = [...res.data];
          this.doctorName = '';
        })
      }else if(this.disease){
        let res = this.tableData.filter(item=>{
          return item.disease.indexOf(this.disease) !==-1
        })
        this.tableData = res;
      }else{
        this.getList()
      }
    },
    handleDetailClick(row){
      this.DetailInfo = {
        disease: row.disease,
        doctorName:row.doctorName,
        createTime: row.createTime,
        tabletName: row.tabletName,
        consumptionTime:row.consumptionTime,
        doctorFollowUp:row.doctorFollowUp,
      };
      this.dialogDetailFormVisible=true
    },
  },
};
</script>

<style scoped>
.container {
  margin: 30px auto;
  width: 1150px;
}

.createbtn {
  margin: 20px 0;
}
.input {
    width: 200px;
    margin-right: 20px;
    margin-bottom:10px;
}
</style>
