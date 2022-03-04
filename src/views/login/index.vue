<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <svg-icon
            icon-class="login-mall"
            style="width: 56px; height: 56px; color: #5e67af"
          ></svg-icon>
        </div>
        <h2 class="login-title color-main">
          Personal Health Monitoring System
        </h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="Please enter username"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="Please enter password"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px; text-align: center">
          <el-button
            style="width: 35%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >
            Sign in
          </el-button>
          <el-button
            style="width: 35%"
            type="primary"
            @click.native.prevent="handleTry"
          >
            Sign up
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="login-bg">
      <img :src="Vital" class="login-center-layout" />
      <img :src="Vital2" class="login-center-layout2" />
    </div>
    <el-dialog
      title="Register"
      :visible.sync="dialogVisible"
      :show-close="false"
      :center="true"
    >
      <el-form
        label-position="left"
        label-width="100px"
        :model="registerInfo"
        :rules="registerRules"
        ref="registerInfo"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="registerInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="registerInfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="registerInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="registerInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-input v-model="registerInfo.age"></el-input>
        </el-form-item>
        <el-form-item label="Height" prop="height">
          <el-input v-model="registerInfo.height"></el-input>
        </el-form-item>
        <el-form-item label="Weight" prop="weight">
          <el-input v-model="registerInfo.weight"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRegisterForm">submit</el-button>
          <el-button @click="cancelRegisterForm">cancel</el-button>
          <el-button @click="resetRegisterForm">reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { setCookie, getCookie } from "@/utils/support";
import login_center_bg from "@/assets/images/login_center_bg.png";
import Vital from "@/assets/images/Vital.png";
import Vital2 from "@/assets/images/vital-sign.png";
import { register } from '@/api/login';
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("Please enter correct username"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("password cannot be empty"));
      } else if (value.length < 3) {
        callback(new Error("Password cannot be less than 3 digits"));
      } else {
        callback();
      }
    };
    const validateRUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("username cannot be empty"));
      } else {
        callback();
      }
    };
    const validateRPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("password cannot be empty"));
      } else {
        callback();
      }
    };
    const validateRPhone = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('Phone cannot be empty'));
        }
        setTimeout(() => {
          if (!Number.isInteger(Number(value))) {
            callback(new Error('Please enter a numeric value'));
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
          return callback(new Error('Age cannot be empty'));
        }
        setTimeout(() => {
          if (!Number.isInteger(Number(value))) {
            callback(new Error('Please enter a numeric value'));
          } else {
              callback();
          }
        }, 1000);
    };
    const validateRWeight = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('Weight cannot be empty'));
        }
        setTimeout(() => {
          if (!Number.isInteger(Number(value))) {
            callback(new Error('Please enter a numeric value'));
          } else {
              callback();
          }
        }, 1000);
    };
    const validateRHeight = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('Height cannot be empty'));
        }
        setTimeout(() => {
          if (!Number.isInteger(Number(value))) {
            callback(new Error('Please enter a numeric value'));
          } else {
              callback();
          }
        }, 1000);
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      },
      loading: false,
      pwdType: "password",
      Vital,
      Vital2,
      dialogVisible: false,
      supportDialogVisible: false,
      registerInfo: {
        username: "",
        password: "",
        phone: null,
        email: "",
        age: null,
        height: null,
        weight: null,
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", validator: validateRUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validateRPassword },
        ],
        phone: [
          { required: true, trigger: "blur", validator: validateRPhone },
        ],
        email: [
          { required: true, trigger: "blur", validator: validateREmail },
        ],
        age: [
          { required: true, trigger: "blur", validator: validateRAge },
        ],
        height: [
          { required: true, trigger: "blur", validator: validateRHeight },
        ],
        weight: [
          { required: true, trigger: "blur", validator: validateRWeight },
        ],
      },
    };
  },
  created() {
    this.loginForm.username = getCookie("username");
    this.loginForm.password = getCookie("password");
    if (
      this.loginForm.username === undefined ||
      this.loginForm.username == null ||
      this.loginForm.username === ""
    ) {
      this.loginForm.username = "admin";
    }
    if (
      this.loginForm.password === undefined ||
      this.loginForm.password == null
    ) {
      this.loginForm.password = "";
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // let isSupport = getSupport();
          // if(isSupport===undefined||isSupport==null){
          //   this.dialogVisible =true;
          //   return;
          // }
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              setCookie("username", this.loginForm.username, 15);
              setCookie("password", this.loginForm.password, 15);
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("Parameter validation is invalid!");
          return false;
        }
      });
    },
    handleTry() {
      this.dialogVisible = true;
    },
    submitRegisterForm() {
      this.$refs.registerInfo.validate((valid) => {
        if (valid) {
          register(this.registerInfo).then(response => {
            this.$message({
              message: 'regsiter successfully',
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
    cancelRegisterForm() {
      this.resetRegisterForm();
      this.dialogVisible = false;
    },
    resetRegisterForm() {
      this.registerInfo = {
        username: "",
        password: "",
        phone: null,
        email: "",
        age: null,
        height: null,
        weight: null,
      }
    }
  },
};
</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #5e67af;
}

.login-title {
  text-align: center;
}
.login-bg{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-center-layout {
  background: #5e67af;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
.login-center-layout2 {
  background: #5e67af;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
  left: 50%;
}
</style>
