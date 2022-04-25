<template>
  <div class="app-container">
    <el-card class="mine-layout">
      <div style="text-align: center">
        <img height="150px" style="border-radius: 10px" src="../../../static/human.png">
      </div>
      <div class="system-bref" style="text-align: center;margin-top: 5px"><div class="color-main">Personal Health Monitoring System (PHMS)</div>a website that helps users maintain various personal health related data. This app or website will be used to track a person's vital signs, daily medication intake or follow a diet plan.</div>
    </el-card>
    <div class="tableul">
      <div class="table-li"
           v-for="(item, index) in allMenuList"
           :key="index"
           :class="{tableliActive:tabNum==item.id}"
           @click="signTable(item.id)"
      >
        {{item.name}}
      </div>
    </div>
    <div id="scrollBox" class="scrollBoxContent">
      <div v-for="(val, index) in allMenuList" :key="val.id" class="scrollItem">
        <div><span class="itemTitle">{{ val.name }}</span><span class="jump" @click="jumpPage(index)">click me to page <i class="el-icon-d-arrow-right"></i></span></div>
        <ul class="itemList">
          <li v-for="(item,index) in val.children" :key="item.id" class="itemListLi">
            <img :src="item.url" v-if="item.url">
            <div class="content-txt" v-html="item.content" v-if="item.content"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import medication from '../../assets/images/medical.png'

  export default {
    name: 'home',
    data() {
      return {
        tabNum:"1",
        allMenuList:[
          {
            id:"1",
            name:"Medication",
            children:[
              {
                content:'<div class="content-txt">Medication the patient is taking and time to take it.</br>Here you can manage your medication records, making it easy to search your medication history</div><img style="margin-top: 10px;border-radius: 60px;max-height: 600px;max-width: 1000px" src="../../../static/medical.png"/>',
              }
            ]
          },
          {
            id:"2",
            name:"Vital signs",
            children:[
              {
                content:'<div class="content-txt">Registering vital signs.</br>Here you can record vital signs, such as blood pressure, blood sugar level, cholesterol... and check your personal health status at any time.</div><img style="margin-top: 10px;border-radius: 60px;max-height: 600px;max-width: 1000px" src="../../../static/Vital.png"/>',
              }
            ]
          },
          {
            id:"3",
            name:"Diet",
            children:[
              {
                content:'<div class="content-txt"> Allow individual to keep track of their food intake, calorie count and their weight.</br>Here you can record your diet, healthy eating is a good life.</div><img style="margin-top: 10px;border-radius: 60px;max-height: 600px;max-width: 1000px" src="../../../static/diet.png"/>',
              }
            ]
          },
          {
            id:"4",
            name:"Note",
            children:[
              {
                content:'<div class="content-txt">Allow individual to keep their favorite recipes, diet descriptions, health articles, or general notes in this system.</br>Here you can write your mood, manage your notes and experiences.</div><img style="margin-top: 10px;border-radius: 60px;max-height: 600px;max-width: 1000px" src="../../../static/noted.png"/>',
              }
            ]
          },
          {
            id:"5",
            name:"Communication",
            children:[
              {
                content:'<div class="content-txt">Keep track of doctors’ appointment.</br>E-mail, cell phone calls and text message should be all provided for relevant communication information.</div><img style="margin-top: 10px;border-radius: 60px;max-height: 600px;max-width: 1000px" src="../../../static/commu3.png"/>',
              }
            ]
          }],
      }
    },
    created(){
    },
    mounted:function(){
      // 获取滚动dom元素
      var _this = this
      var scrollItems = document.getElementsByClassName('scrollItem')
      var screenHeight = window.screen.height
      var flag = false
      window.addEventListener('scroll',function (e) {
        var e = e || window.event
        var scrollHeight = $(window).scrollTop();
        for (var i = scrollItems.length-1 ; i >= 0; i--) {
          var differHeight = scrollItems[i].offsetTop - scrollItems[0].offsetTop;
          // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
          var differFlag = scrollHeight >= differHeight
          if (differFlag) {
            _this.tabNum = i+1;
            break;
          }
        }
      })
    },
    methods:{
      signTable:function(value) {
        this.tabNum = value;
        var scrollItems = document.getElementsByClassName("scrollItem");
        for (var i = 0; i < scrollItems.length; i++) {
          if (value  == i+1) {
            $('html,body').animate({scrollTop:scrollItems[i].offsetTop-scrollItems[0].offsetTop},666);
          }
        }
      },
      jumpPage(index){
        switch(index) {
          case 0:
            this.$router.push('/medication/medicationList');
            break;
          case 1:
            this.$router.push('/vital-signs/list');
            break;
          case 2:
            this.$router.push('/diet/list');
            break;
          case 3:
            break;
          case 4:
            this.$router.push('/comm/list');
            break;
        }
        console.log(index)
      }
    }
  }
</script>

<style scoped>
  .app-container {
    margin-left: 120px;
    margin-right: 120px;
    font-family:"SourceSansPro-Regular", "Graphik SemiBold","Arial","微软雅黑",Sans-Serif;

  }
  .content-txt{
    font-size: 18px;
    color: rgb(23, 146, 231);
    margin-bottom: 10px;
  }
  .system-bref{
    font-size: 20px;
    line-height: 26px;
  }
  .mine-layout {
    top: 107px;
    height: 280px;
  }
  .itemTitle{
    font-size: 28px;
    font-weight: 800;
  }
  .tableul{
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    margin-top: 20px;
    font-size: 30px;
  }
  .table-li{
    height: 20px;
    border: 1px;
    padding-bottom: 35px;
  }
  .tableliActive{
    border-bottom: 0.313rem solid #00baff;
  }
.jump{
  color: #c28b00;
  margin-left: 50px;
}
</style>
