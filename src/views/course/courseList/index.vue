<template>
  <div class="courseList h100">
    <el-row class="mb-10">
      <el-form ref="form" :model="item" label-position="right" label-width="70px">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="课程名称">
              <el-input v-model="item.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="教师">
              <el-input v-model="item.teach"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报名时间">
              <el-date-picker
                v-model="times"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width:100%"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button @click="onsearch">查询</el-button>
            <el-button @click="()=>$router.push({name:'courseActive',query:{id:null}})">新增</el-button>
            <el-button
              :disabled="items.length !== 1"
              @click="()=>$router.push({name:'courseActive',query:{id: items[0].id}})"
            >修改</el-button>
            <!-- 批量删除 -->
            <!-- <el-button :disabled="items.length === 0" @click="onDelete">删除</el-button> -->
            <!-- 单个删除 -->
            <el-button :disabled="items.length !== 1" @click="onDelete">删除</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-table
      v-loading="loading"
      :data="table.data"
      class="w100"
      border
      @selection-change="(v)=> items = v"
      :height="'calc(100% - 57px - 32px)'"
    >
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column
        v-for="(column,i) of table.column"
        :key="i"
        :label="column.name"
        :width="column.width"
      >
        <template slot-scope="scope">
          <span class="yichu" v-if="column.code==='bytype'">
            <span
              :title="scope.row.bylive.label + ' + ' + scope.row.byface.label"
              v-if="scope.row.bylive.do && scope.row.byface.do"
            >{{ scope.row.bylive.label + ' + ' + scope.row.byface.label}}</span>
            <span
              v-if="scope.row.bylive.do && !scope.row.byface.do"
              :title="scope.row.bylive.label"
            >{{ scope.row.bylive.label }}</span>
            <span
              v-if="!scope.row.bylive.do && scope.row.byface.do"
              :title="scope.row.byface.label"
            >{{ scope.row.byface.label }}</span>
          </span>
          <span
            class="yichu"
            v-if="column.code !=='bytype'"
            :title="scope.row[column.code]"
          >{{ scope.row[column.code] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="text-right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagCfg.pageidx"
      :page-sizes="[10, 30, 50]"
      :page-size="pagCfg.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageCount"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getSubjectsList, subjectsDel } from "@/api/subjectsApi";
import { resetParam } from "@/util";
@Component
export default class CourseList extends Vue {
  log: any;
  item: any = {};
  table: any = {
    column: [
      {
        name: "课程名称",
        code: "name"
      },
      {
        name: "课程时长",
        code: "along"
      },
      {
        name: "上课形式",
        code: "bytype"
      },
      {
        name: "班次",
        code: "class"
      },
      {
        name: "代课教师",
        code: "tname"
      },
      {
        name: "发布时间",
        code: "rbegin"
      }
    ],
    data: [
      {
        name: "上海市普陀区金沙江路 1518 弄",
        tname: "王小虎",
        along: "70小时",
        //是否面授
        byface: {
          do: false,
          label: "面授"
        },
        //是否直播
        bylive: {
          do: true,
          label: "直播"
        },
        rbegin: "2019-05-02",
        class: "03期5月2日班"
      },
      {
        name: "上海市普陀区金沙江路 1517 弄",
        tname: "王小虎",
        along: "60小时",
        //是否面授
        byface: {
          do: true,
          label: "面授"
        },
        //是否直播
        bylive: {
          do: true,
          label: "直播"
        },
        rbegin: "2019-05-04",
        class: "03期5月4日班"
      }
    ]
  };
  items: any = [];
  times: any = [];
  pageCount: number = 0;
  pagCfg: any = {
    pageidx: 1,
    pagesize: 10
  };
  loading: boolean = false;
  mounted() {
    this.getSubjectsListFn(this.pagCfg);
  }
  handleSizeChange(v: any) {
    this.pagCfg.pagesize = v;
    this.getSubjectsListFn(
      Object.assign(this.pagCfg, resetParam(this.times, this.item))
    );
  }
  handleCurrentChange(v: any) {
    this.pagCfg.pageidx = v;
    this.getSubjectsListFn(
      Object.assign(this.pagCfg, resetParam(this.times, this.item))
    );
  }
  onsearch() {
    this.getSubjectsListFn(
      Object.assign(this.pagCfg, resetParam(this.times, this.item))
    );
  }
  async getSubjectsListFn(param: any) {
    this.loading = true;
    let res: any = await getSubjectsList(param);
    this.log(res);
    if (res.ok) {
      this.table.data = res.data;
      this.pageCount = res.count;
    } else {
      alert(res.msg);
    }
    this.loading = false;
  }
  async onDelete() {
    // 单个删除
    let param = {
      id: this.items[0].id
    };
    let res: any = await subjectsDel(param);
    this.log(res);
    if (res.ok) {
      this.getSubjectsListFn(
        Object.assign(this.pagCfg, resetParam(this.times, this.item))
      );
    } else {
      alert(res.msg);
    }
    // 批量删除
    // let param: any = [];
    // this.items.forEach((el: any) => {
    //   param.push({
    //     id: el.id
    //   });
    // });
    // let res: any = await subjectsDel(param);
    // if (res.ok) {
    //   this.getSubjectsListFn({});
    // } else {
    //   alert(res.msg);
    // }
  }
}
</script>
