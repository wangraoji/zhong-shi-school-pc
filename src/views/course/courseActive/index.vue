<template>
  <div class="courseActive">
    <h3 class="mb-10">{{ title }}</h3>
    <el-form ref="form" label-position="left" :model="form" label-width="80px">
      <el-col :xl="18" :lg="120" :md="24" :sm="24" :xs="24">
        <el-form-item label="课程名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="报名时间">
          <el-date-picker
            v-model="regtime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="授课方式">
          <el-checkbox label="直播" v-model="form.byface.do"></el-checkbox>
          <el-checkbox label="面授" v-model="form.bylive.do"></el-checkbox>
        </el-form-item>
        <el-form-item label="有效期">
          <el-input type="number" placeholder="请输入时长" v-model="form.terml" style="width:250px">
            <el-select v-model="form.termu" slot="append" placeholder="请选择单位" style="width:120px">
              <el-option v-for="(op,i) of termuOption" :key="i" :label="op.label" :value="op.value"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="负责教师">
          <el-input v-model="form.tname" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="班次">
          <div class="card">
            <el-row class="mb-10">
              <el-button @click="()=> classData.push({})">新增班次</el-button>
            </el-row>
            <el-row v-for="(item,i) of classData" :key="i">
              <el-col :span="6">
                <el-form-item label="班级名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item label="总人数">
                  <el-input v-model="item.count" type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-button type="danger" @click="()=> $delete(classData,i)">删除</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="直播">
          <div class="card">
            <el-row class="mb-10">
              <el-form-item label="学期">
                <el-date-picker
                  v-model="live.timer"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="频率">
                <el-row class="mb-10">
                  <el-button @click="()=> live.rate.push({})">新增频率</el-button>
                </el-row>
                <el-row v-for="(item,i) of live.rate" :key="i">
                  <el-col :span="13">
                    <el-checkbox
                      v-for="(w,i1) of weekOption"
                      v-model="item['w' + (i1+1)]"
                      :key="i1"
                      :label="w"
                    ></el-checkbox>
                  </el-col>
                  <el-col :span="9">
                    <el-time-picker
                      is-range
                      v-model="item.times"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                    ></el-time-picker>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="danger" @click="()=> $delete(live.rate,i)">删除</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="面授">
          <div class="card">
            <el-row class="mb-10">
              <el-form-item label="学期">
                <el-date-picker
                  v-model="face.timer"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="频率">
                <el-row class="mb-10">
                  <el-button @click="()=> face.rate.push({})">新增频率</el-button>
                </el-row>
                <el-row v-for="(item,i) of face.rate" :key="i">
                  <el-col :span="13">
                    <el-checkbox
                      v-for="(w,i1) of weekOption"
                      v-model="item['w' + (i1+1)]"
                      :key="i1"
                      :label="w"
                    ></el-checkbox>
                  </el-col>
                  <el-col :span="9">
                    <el-time-picker
                      is-range
                      v-model="item.times"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                      format="HH:mm:ss"
                      value-format="HH:mm:ss"
                    ></el-time-picker>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="danger" @click="()=> $delete(face.rate,i)">删除</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item>
          <el-tabs v-model="activeName">
            <el-tab-pane label="课程介绍" name="first">
              <quill-editor v-model="form.subint" :options="editorOption"></quill-editor>
            </el-tab-pane>
            <el-tab-pane label="课程大纲" name="second">
              <quill-editor v-model="form.subline" :options="editorOption"></quill-editor>
            </el-tab-pane>
            <el-tab-pane label="师资展示" name="third">
              <quill-editor v-model="form.tecint" :options="editorOption"></quill-editor>
            </el-tab-pane>
            <el-tab-pane label="听课指导" name="fourth">
              <quill-editor v-model="form.lisint" :options="editorOption"></quill-editor>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="()=>$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";
import { subjectsAdd, subjectsEdit, getSubjects } from "@/api/subjectsApi";
@Component
export default class CourseActive extends Vue {
  log: any;
  title: string = "新增课程";
  activeName: string = "first";
  form: any = {
    byface: {},
    bylive: {}
  };
  // 报名时间
  regtime: any = [];
  // 授课方式
  bytype: any = [];
  // 班次
  classData: any = [{}];
  // 直播排期
  live: any = {
    timer: [],
    rate: [{}]
  };
  face: any = {
    timer: [],
    rate: [{}]
  };
  termuOption: any = [
    {
      label: "小时",
      value: 0
    },
    {
      label: "天",
      value: 1
    },
    {
      label: "周",
      value: 2
    },
    {
      label: "月",
      value: 3
    },
    {
      label: "年",
      value: 4
    },
    {
      label: "永久",
      value: 20
    }
  ];
  weekOption: any = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  editorOption: any = {
    placeholder: "在这里插入文字......"
  };
  mounted() {
    // let data: any = this.$route.query.data ? JSON.parse(this.$route.query.data) || {};
    let data: any = this.$route.query.id;
    if (data) {
      this.title = "修改课程";
      this.getSubjectsFn({ id: data });
    } else {
      this.title = "新增课程";
      this.form = {
        byface: {},
        bylive: {}
      };
      this.regtime = [];
      this.bytype = [];
      this.classData = [{}];
      this.live = {
        timer: [],
        rate: [{}]
      };
      this.face = {
        timer: [],
        rate: [{}]
      };
    }
  }
  onEditorReady(e: any) {
    // this.log(e);
  }
  async getSubjectsFn(param: any) {
    let res: any = await getSubjects(param);
    if (res.ok) {
      let data: any = res.data;
      this.log(data);
      this.regtime = [data.rbegin || "", data.rend || ""];
      this.form = _.cloneDeep(data);
      this.bytype = _.cloneDeep(data.bytype);
      this.classData = _.cloneDeep(data.classData);
      this.live.timer = [
        data.live.timer.begin || "",
        data.live.timer.end || ""
      ];
      this.live.rate = _.cloneDeep(data.live.rate);
      this.live.rate.forEach((e: any) => {
        e.times = [e.begin || "", e.end || ""];
      });
      this.face.timer = [data.face.timer.begin, data.face.timer.end];
      this.face.rate = _.cloneDeep(data.face.rate);
      this.face.rate.forEach((e: any) => {
        e.times = [e.begin || "", e.end || ""];
      });
    } else {
      alert(res.msg);
    }
  }
  async onSubmit() {
    this.form.class = _.cloneDeep(this.classData);
    this.form.live = {
      timer: {},
      rate: []
    };
    this.form.face = {
      timer: {},
      rate: []
    };
    if (this.live.timer.length > 0) {
      this.form.live.timer.begin = this.live.timer[0];
      this.form.live.timer.end = this.live.timer[1];
    }
    if (this.face.timer.length > 0) {
      this.form.face.timer.begin = this.face.timer[0];
      this.form.face.timer.end = this.face.timer[1];
    }
    let liveRate = _.cloneDeep(this.live.rate);
    let faceRate = _.cloneDeep(this.face.rate);
    liveRate.forEach((e: any) => {
      if (e.times && e.times.length > 0) {
        e.begin = e.times[0];
        e.end = e.times[1];
      }
      this.$delete(e, "times");
    });
    faceRate.forEach((e: any) => {
      if (e.times && e.times.length > 0) {
        e.begin = e.times[0];
        e.end = e.times[1];
      }
      this.$delete(e, "times");
    });
    this.form.live.rate = _.cloneDeep(liveRate);
    this.form.face.rate = _.cloneDeep(faceRate);

    this.log(this.form);
    let res: any =
      this.title === "新增内容"
        ? await subjectsAdd(this.form)
        : await subjectsEdit(this.form);
        this.log(res);
    if (res.ok) {
      this.$router.push({ path: "courseList" });
    } else {
      alert(res.msg);
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid #ebeef5;
  padding: 5px;
  border-radius: 3px;
}
</style>

