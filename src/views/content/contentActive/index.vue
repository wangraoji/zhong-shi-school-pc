<template>
  <div class="contentActive">
    <h3 class="mb-10">{{ title }}</h3>
    <el-form ref="form" :model="form" label-position="left" label-width="80px">
      <el-row>
        <el-col :xl="6" :lg="8" :md="12" :sm="16" :xs="24">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="二级标题">
            <el-input v-model="form.stitle"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="form.type">
              <el-radio :label="0">观点</el-radio>
              <el-radio :label="20">新闻</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.state">
              <el-radio :label="0">待审核</el-radio>
              <el-radio :label="20">可发布</el-radio>
              <el-radio :label="40">已发布</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="form.anthor"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="内容">
          <quill-editor
            v-model="form.content"
            ref="myQuillEditor"
            :options="editorOption"
            @ready="onEditorReady($event)"
          ></quill-editor>
        </el-form-item>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="()=>$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";
import { contentsAdd, contentsEdit } from "@/api/contentsApi";
@Component
export default class ContentActive extends Vue {
  log: any;
  title: string = "新增内容";
  form: any = {};
  editorOption: any = {
    placeholder: "在这里插入文字......"
  };
  mounted() {
    let data: any = this.$route.query.data;
    if (data && data.title) {
      this.title = "修改内容";
      this.form = _.cloneDeep(data);
    } else {
      this.title = "新增内容";
      this.form = {};
    }
  }
  onEditorReady(e: any) {
    // this.log(e);
  }
  async onSubmit() {
    let res: any =
      this.title === "新增内容"
        ? await contentsAdd(this.form)
        : await contentsEdit(this.form);
    if (res.ok) {
      this.$router.push({ path: "contentList" });
    } else {
      alert(res.msg);
    }
  }
}
</script>
