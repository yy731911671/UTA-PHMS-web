<template>
  <div>
    <div class="container">
      <el-table :data="tableData" border class="table">
        <el-table-column prop="disease" label="Disease" width="200px">
        </el-table-column>
        <el-table-column prop="injectionName" label="injection name" width="200px">
        </el-table-column>
        <el-table-column
          prop="tabletName"
          label="Medicines prescribed"
          width="200px"
        >
        </el-table-column>
        <el-table-column prop="lastTime" label="Last time taken" width="200px">
        </el-table-column>
        <el-table-column prop="reminderTime" label="reminder time" width="200px">
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
        tableData: [
          {
            "id": 1,
            "lastTime": "2022-03-27 12:59:51",
            "reminderTime": "2022-03-28 13:59:51",
            "disease": "Headache1111",
            "tabletName": "Ibuprofen Sustained-Release Capsules",
            "doctorName": "Mr. Wang",
            "injectionName": "Acyclovir",
          },
          {
            "id": 2,
            "lastTime": "2022-04-01 11:59:51",
            "reminderTime": "2022-04-02 12:59:51",
            "disease": "Lung Abscess",
            "tabletName": "Amoxicillin capsule",
            "doctorName": "Mr. Anderson",
            "injectionName": "Levofloxacin",
          },
          {
            "id": 3,
            "lastTime": "2022-04-03 13:59:51",
            "reminderTime": "2022-04-04 14:59:51",
            "disease": "Gout",
            "tabletName": "Painkiller",
            "doctorName": "Mr. Wang",
            "injectionName": "Uric acid lowering",
          },
          {
            "id": 4,
            "lastTime": "2022-04-04 14:59:51",
            "reminderTime": "2022-04-05 15:59:51",
            "disease": "Diabetes Mellitus",
            "tabletName": "Metformin",
            "doctorName": "Mr. Wang",
            "injectionName": "Insulin",
          },
          {
            "id": 5,
            "lastTime": "2022-04-07 10:59:51",
            "reminderTime": "2022-04-08 11:59:51",
            "disease": "Acute gastritis",
            "tabletName": "Ranitidine",
            "doctorName": "Mr. Anderson",
            "injectionName": "Famotidine",
          }
        ],
      };
    },
    created() {
    },
    methods: {
    },
  };
</script>

<style scoped>
  .container {
    width: 1200px;
    margin: 50px;
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
