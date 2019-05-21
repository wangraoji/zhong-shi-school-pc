<template>
  <div class="layout h100">
    <el-container class="h100">
      <el-aside width="220px" class="h100">
        <Menu />
      </el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Menu from "@/components/menu.vue";
@Component({
  components: {
    Menu
  }
})
export default class Layout extends Vue {}
</script>
