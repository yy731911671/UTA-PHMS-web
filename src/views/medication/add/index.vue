<template>
  <div>
    <div class="container">
      <el-input
        placeholder="disease"
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
        <el-table-column prop="disease" label="Disease" width="200px">
        </el-table-column>
        <el-table-column prop="doctorName" label="Doctor name" width="200px">
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
          width="200px"
        >
        </el-table-column>
      </el-table>
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
        getListByDoctorName(this.doctorName).then(res => {
            this.tableData = [...res.data];
            this.doctorName = '';
        })
    }
  },
};
</script>

<style scoped>
.container {
  width: 1200px;
  margin: 30px auto;
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
