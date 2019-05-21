<template>
  <el-row class="h100">
    <el-menu
      class="el-menu-demo h100"
      :default-active="defaultActive"
      background-color="#545c64"
      text-color="#fff"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="contentList">内容列表</el-menu-item>
        <el-menu-item index="contentActive">内容编辑</el-menu-item>
        <el-menu-item index="contentPush">内容推送</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>课程管理</span>
        </template>
        <el-menu-item index="courseList">课程列表</el-menu-item>
        <el-menu-item index="courseActive">课程编辑</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>报名管理</span>
        </template>
        <el-menu-item index="enterNameList">报名列表</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>读书会管理</span>
        </template>
        <el-menu-item index="bookClubList">读书会列表</el-menu-item>
        <el-menu-item index="bookClubActive">读书会编辑</el-menu-item>
      </el-submenu>
      <el-menu-item index="baseSetting">
        <i class="el-icon-setting"></i>
        <span slot="title">基础设置</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Menu extends Vue {
  defaultActive: any = "";

  mounted() {
    this.defaultActive = this.$route.name;
  }
  // 监视路由
  @Watch("$route")
  onChildChanged(val: any, oldVal: any) {
    this.defaultActive = val.name;
  }
}
</script>
<style lang="scss" scoped>
</style>

