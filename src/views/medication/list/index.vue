<template>
  <div>
    <div class="container">
      <el-button
        type="primary"
        class="createbtn"
        @click="dialogCreateFormVisible = true"
        >Add</el-button
      >
      <el-table :data="tableData" border class="table">
        <el-table-column prop="disease" label="Disease" width="300px">
        </el-table-column>
        <el-table-column prop="doctorName" label="Doctor name" width="300px">
        </el-table-column>
        <el-table-column
          prop="doctorFollowUp"
          label="Prescribing date"
          width="300px"
        >
        </el-table-column>
        <el-table-column label="Operate" width="100px">
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
    <el-dialog title="Add Medication" :visible.sync="dialogCreateFormVisible">
      <el-form :model="createForm">
        <el-form-item label="Disease" :label-width="formLabelWidth">
          <el-input v-model="createForm.disease" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Doctor name" :label-width="formLabelWidth">
          <el-input v-model="createForm.doctorName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Tablet name" :label-width="formLabelWidth">
          <el-input v-model="createForm.tabletName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Injection name" :label-width="formLabelWidth">
          <el-input v-model="createForm.injectionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Time of consumption" :label-width="formLabelWidth">
          <el-input v-model="createForm.consumptionTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Doctor follow-up" :label-width="formLabelWidth">
          <el-input v-model="createForm.doctorFollowUp" autocomplete="off"></el-input>
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
          <el-input v-model="editForm.disease" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Doctor name" :label-width="formLabelWidth">
          <el-input v-model="editForm.doctorName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Tablet name" :label-width="formLabelWidth">
          <el-input v-model="editForm.tabletName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Injection name" :label-width="formLabelWidth">
          <el-input v-model="editForm.injectionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Time of consumption" :label-width="formLabelWidth">
          <el-input v-model="editForm.consumptionTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Doctor follow-up" :label-width="formLabelWidth">
          <el-input v-model="editForm.doctorFollowUp" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleEditSubmit()"
          >Submit</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMedicationList,
  createMedication,
  deleteMedication,
  editMedication,
} from "../../../api/medication";
export default {
  name: "index",
  data() {
    return {
      tableData: [],
      dialogCreateFormVisible: false,
      dialogEditFormVisible: false,
      createForm: {
        disease: "",
        doctorName: "",
        tabletName: "",
        consumptionTime: "",
        injectionName: "",
        doctorFollowUp: "",
      },
      editForm: {
        id: '',
        disease: "",
        doctorName: "",
        tabletName: "",
        consumptionTime: "",
        injectionName: "",
        doctorFollowUp: "",
      },
      formLabelWidth: '150px'
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
    handleDeleteClick(row) {
      deleteMedication(row.id).then((res) => {
        this.getList();
      });
    },
    clearCreateForm() {
        this.createForm = {
            disease: "",
            doctorName: "",
            tabletName: "",
            consumptionTime: "",
            injectionName: "",
            doctorFollowUp: "",
      }
    },
    clearEditForm() {
        this.editForm = {
            id: '',
            disease: "",
            doctorName: "",
            tabletName: "",
            consumptionTime: "",
            injectionName: "",
            doctorFollowUp: "",
        }
    },
    handleCreateSubmit() {
        createMedication(this.createForm).then( res => {
            this.dialogCreateFormVisible = false;
            this.clearCreateForm();
            this.getList();
        })
    },
    handleEditClick(row) {
        this.editForm = {
            id: row.id,
            disease: row.disease,
            doctorName: row.doctorName,
            tabletName: row.tabletName,
            consumptionTime: row.consumptionTime,
            injectionName: row.injectionName,
            doctorFollowUp: row.doctorFollowUp,
        };
        this.dialogEditFormVisible = true;
    },
    handleEditSubmit() {
        editMedication(this.editForm).then(res => {
            this.dialogEditFormVisible = false;
            this.clearEditForm();
            this.getList();
        })
    }
  },
};
</script>

<style scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}

.createbtn {
  margin: 20px 0;
}
</style>
