<template>
  <div>
    <el-descriptions
      title="Profiles"
      direction="vertical"
      :column="1"
      border
    >
    <template slot="extra">
      <el-button type="primary" size="small" @click="openEditModel">Edit</el-button>
    </template>
      <el-descriptions-item label="Username">{{updateInfo.username}}</el-descriptions-item>
      <el-descriptions-item label="Email">{{updateInfo.email}}</el-descriptions-item>
      <el-descriptions-item label="Phone">{{updateInfo.phone}}</el-descriptions-item>
      <el-descriptions-item label="Age">{{updateInfo.age}}</el-descriptions-item>
      <el-descriptions-item label="Height">{{updateInfo.height}}</el-descriptions-item></el-descriptions-item>
      <el-descriptions-item label="Weight">{{updateInfo.weight}}</el-descriptions-item></el-descriptions-item>
    </el-descriptions>
    <el-dialog
      title="Edit"
      :visible.sync="dialogVisible"
      :show-close="false"
      :center="true"
    >
      <el-form
        label-position="left"
        label-width="80px"
        :model="updateInfo"
        :rules="updateRules"
        ref="updateInfo"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="updateInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="updateInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="updateInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-input v-model="updateInfo.age"></el-input>
        </el-form-item>
        <el-form-item label="Height" prop="height">
          <el-input v-model="updateInfo.height"></el-input>
        </el-form-item>
        <el-form-item label="Weight" prop="weight">
          <el-input v-model="updateInfo.weight"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm">submit</el-button>
          <el-button @click="cancelEditForm">cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateProfiles, getInfo } from "@/api/login";
export default {
  name: "profile",
  data() {
    const validateRUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("username cannot be empty"));
      } else {
        callback();
      }
    };
    const validateRPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Phone cannot be empty"));
      }
      setTimeout(() => {
        if (!Number.isInteger(Number(value))) {
          callback(new Error("Please enter a numeric value"));
        } else {
          callback();
        }
      }, 1000);
    };
    const validateREmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Email cannot be empty"));
      } else {
        callback();
      }
    };
    const validateRAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Age cannot be empty"));
      }
      setTimeout(() => {
        if (!Number.isInteger(Number(value))) {
          callback(new Error("Please enter a numeric value"));
        } else {
          callback();
        }
      }, 1000);
    };
    const validateRWeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Weight cannot be empty"));
      }
      setTimeout(() => {
        if (!Number.isInteger(Number(value))) {
          callback(new Error("Please enter a numeric value"));
        } else {
          callback();
        }
      }, 1000);
    };
    const validateRHeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Height cannot be empty"));
      }
      setTimeout(() => {
        if (!Number.isInteger(Number(value))) {
          callback(new Error("Please enter a numeric value"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      updateInfo: {
        username: "",
        phone: null,
        email: "",
        age: null,
        height: null,
        weight: null,
      },
      updateRules: {
        username: [
          { required: true, trigger: "blur", validator: validateRUsername },
        ],
        phone: [{ required: true, trigger: "blur", validator: validateRPhone }],
        email: [{ required: true, trigger: "blur", validator: validateREmail }],
        age: [{ required: true, trigger: "blur", validator: validateRAge }],
        height: [
          { required: true, trigger: "blur", validator: validateRHeight },
        ],
        weight: [
          { required: true, trigger: "blur", validator: validateRWeight },
        ],
      },
      dialogVisible: false,
    };
  },
  created() {
    getInfo().then((res) => {
      this.updateInfo = {
        username: res.data.username,
        phone: res.data.phone,
        email: res.data.email,
        age: res.data.age,
        height: res.data.height,
        weight: res.data.weight,
      };
    });
  },
  methods: {
    openEditModel() {
      this.dialogVisible = true;
    },
    submitEditForm() {
       this.$refs.updateInfo.validate((valid) => {
        if (valid) {
          updateProfiles(this.updateInfo).then(response => {
            this.$message({
              message: 'update successfully',
              type: 'success'
            });
            this.dialogVisible = false;
        }).catch(error => {
          this.$message({
              message: error,
              type: 'error'
            });
        });
        } else {
          console.log("Parameter validation is invalid!");
          return false;
        }
      });  
    },
    cancelEditForm() {
      this.dialogVisible = false;
      getInfo().then((res) => {
        this.updateInfo = {
          username: res.data.username,
          phone: res.data.phone,
          email: res.data.email,
          age: res.data.age,
          height: res.data.height,
          weight: res.data.weight,
        };
      });
    },
  },
};
</script>

<style scoped>
</style>
