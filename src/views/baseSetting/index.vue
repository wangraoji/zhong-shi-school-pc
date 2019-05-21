<template>
  <div class="baseSetting">
    <el-row class="mb-10">
      <el-checkbox v-model="item.push">报名状态更改时是否推送微信消息</el-checkbox>
    </el-row>
    <br>
    <br>
    <el-row class="mb-10">联系我们</el-row>
    <el-row class="mb-10">
      <quill-editor v-model="item.contacUs" :options="editorOption"></quill-editor>
    </el-row>
    <el-row>
      <el-button type="primary">提交</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class BaseSetting extends Vue {
  item: any = {};
  editorOption: any = {
    placeholder: "在这里插入文字......"
  };
}
</script>
