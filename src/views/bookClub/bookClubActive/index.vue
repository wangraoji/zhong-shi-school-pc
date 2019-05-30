<template>
  <div class="bookClubActive">
    <h3 class="mb-10">{{ title }}</h3>
    <el-form ref="form" label-position="left" :model="form" label-width="80px">
      <el-col :xl="18" :lg="120" :md="24" :sm="24" :xs="24">
        <el-form-item label="主题名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="举办方式">
          <el-checkbox label="线上" v-model="form.byinter.do"></el-checkbox>
          <el-checkbox label="线下" v-model="form.byoutline.do"></el-checkbox>
        </el-form-item>
        <el-form-item label="举办时间">
          <el-date-picker
            v-model="form.stime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.state">
            <el-radio :label="0">待审核</el-radio>
            <el-radio :label="20">可发布</el-radio>
            <el-radio :label="40">已发布</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
        <el-form-item label="举办地点">
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-row class="mb-5">
              <el-col :span="12">志愿者</el-col>
              <el-col :span="12" class="text-right">
                <el-button @click="addClick('helper')">新增</el-button>
              </el-col>
            </el-row>
            <el-table :data="form.helper" border>
              <el-table-column label="姓名">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="电话">
                <template slot-scope="scope">{{ scope.row.phone }}</template>
              </el-table-column>
              <el-table-column label="邮箱">
                <template slot-scope="scope">{{ scope.row.mail }}</template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="rowDelete(scope.$index, form.helper)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-row class="mb-5">
              <el-col :span="12">听众</el-col>
              <el-col :span="12" class="text-right">
                <el-button @click="addClick('listener')">新增</el-button>
              </el-col>
            </el-row>
            <el-table :data="form.listener" border>
              <el-table-column label="姓名">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="电话">
                <template slot-scope="scope">{{ scope.row.phone }}</template>
              </el-table-column>
              <el-table-column label="邮箱">
                <template slot-scope="scope">{{ scope.row.mail }}</template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="rowDelete(scope.$index, form.listener)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form-item>
        <el-form-item label="简介">
          <quill-editor v-model="form.intro" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="()=>$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <el-dialog
      width="20%"
      :title="dialogCfg.title"
      :visible.sync="dialogCfg.isShow"
      :close-on-click-modal="false"
    >
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="dialogCfg.data.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="dialogCfg.data.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="dialogCfg.data.mail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCfg.isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getBookClub } from "@/api/bookClubApi";
import _ from "lodash";
@Component
export default class BookClubActive extends Vue {
  log: any;
  title: string = "新增读书会";
  form: any = {
    byinter: {},
    byoutline: {},
    helper: [],
    listener: []
  };
  dialogCfg: any = {
    title: "",
    isShow: false,
    data: {}
  };
  editorOption: any = {
    placeholder: "在这里插入文字......"
  };
  mounted() {
    let data: any = this.$route.query.id;
    if (data) {
      this.title = "修改内容";
      // this.form = _.cloneDeep(data);
      this.getBookClubFn({ id: data });
      // this.log(this.form);
    } else {
      this.title = "新增内容";
      this.form = {
        byinter: {},
        byoutline: {},
        helper: [],
        listener: []
      };
    }
  }
  // 获取读书会详情
  async getBookClubFn(id: any) {
    let res: any = await getBookClub(id);
    this.log(res);
    if (res.ok) {
      this.form = _.cloneDeep(res.data);
    } else {
      alert(res.msg);
    }
  }
  addClick(tag: string) {
    this.dialogCfg.isShow = true;
    this.dialogCfg.title = tag === "helper" ? "志愿者" : "听众";
    this.dialogCfg.data = {};
  }
  rowDelete(index: any, data: any) {
    this.$delete(data, index);
  }
  confirm() {
    if (this.dialogCfg.title === "志愿者") {
      this.form.helper.push(_.cloneDeep(this.dialogCfg.data));
    } else {
      this.form.listener.push(_.cloneDeep(this.dialogCfg.data));
    }
    this.dialogCfg.isShow = false;
  }
  onSubmit() {
    this.log(this.form);
  }
}
</script>
