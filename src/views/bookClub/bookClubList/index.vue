<template>
  <div class="bookClubList h100">
    <el-row class="mb-10">
      <el-form ref="form" :model="item" label-position="right" label-width="70px">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="主题">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="负责人">
              <el-input v-model="item.contact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="举办时间">
              <el-date-picker
                v-model="item.stime"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button @click="onsearch">查询</el-button>
            <el-button @click="()=>$router.push({name:'bookClubActive'})">新增</el-button>
            <el-button
              :disabled="items.length !== 1"
              @click="()=>$router.push({name:'bookClubActive',query:{id:items[0].id}})"
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
          <span class="yichu" v-if="column.code==='state'">
            {{
            scope.row[column.code] === 0 ? '待审核' :
            scope.row[column.code] === 20 ? '可发布' : '已发布'
            }}
          </span>
          <span class="yichu" v-if="column.code==='type'">
            {{
            scope.row[column.code] === 0 ? '观点' : '新闻'
            }}
          </span>
          <span
            class="yichu"
            v-if="column.code !=='type' && column.code !=='state'"
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
import { getBookClubList } from "@/api/bookClubApi";
import _ from "lodash";
import { resetParam } from "@/util";
@Component
export default class ContentList extends Vue {
  log: any;
  item: any = {
    // //主题
    // title: "",
    // //负责人
    // contact: "",
    // //举办时间
    // stime: "",
  };
  table: any = {
    column: [
      {
        name: "主题",
        code: "title"
      },
      {
        name: "负责人",
        code: "contact"
      },
      {
        name: "举办时间",
        code: "stime"
      },
      {
        name: "举办方式",
        code: "kind"
      },
      {
        name: "志愿者人数",
        code: "hcount"
      },
    ],
    data: [
      {
        title: "上海市普陀区金沙江路 1518 弄",

        anthor: "王小虎",
        pubbegin: "2019-09-15",
        ptime: "2016-05-02",
        state: 40,
        stitle: "子标题1",
        type: 0
      },
      {
        title: "上海市普陀区金沙江路 1517 弄",
        anthor: "王小虎",
        pubbegin: "2019-05-13",
        ptime: "2016-05-04",
        state: 0,
        stitle: "子标题2",
        type: 20
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
    this.getBookClubListFn(this.pagCfg);
  }
  handleSizeChange(v: any) {
    this.pagCfg.pagesize = v;
    this.getBookClubListFn(
      Object.assign(this.pagCfg, resetParam(this.times, this.item))
    );
  }
  handleCurrentChange(v: any) {
    this.pagCfg.pageidx = v;
    this.getBookClubListFn(
      Object.assign(this.pagCfg, resetParam(this.times, this.item))
    );
  }
  onsearch() {
    this.getBookClubListFn(
      Object.assign(this.pagCfg, resetParam(this.times, this.item))
    );
  }
  async onDelete() {
    // 单个删除
    // let param = {
    //   id: this.items[0].id
    // };
    // let res: any = await contentsDel(param);
    // if (res.ok) {
    //   this.getBookClubListFn(
    //     Object.assign(this.pagCfg, resetParam(this.times, this.item))
    //   );
    // } else {
    //   alert(res.msg);
    // }
    // 批量删除
    // let param: any = [];
    // this.items.forEach((el: any) => {
    //   param.push({
    //     id: el.id
    //   });
    // });
    // let res: any = await contentsDel(param);
    // if (res.ok) {
    //   this.getBookClubListFn({});
    // } else {
    //   alert(res.msg);
    // }
  }
  async getBookClubListFn(param: any) {
    this.loading = true;
    let res: any = await getBookClubList(param);
    this.log(res);
    if (res.ok) {
      this.table.data = res.data;
      this.pageCount = res.count;
    } else {
      alert(res.msg);
    }
    this.loading = false;
  }
}
</script>
