<template>
  <div class="bookClubList">
    <el-row class="mb-10">
      <el-form ref="form" :model="item" label-position="left" label-width="70px">
        <!-- 名称 -->
        <el-col :span="4">
          <el-form-item label="主题名称">
            <el-input v-model="item.title"></el-input>
          </el-form-item>
        </el-col>
        <!-- 报名时间 -->
        <el-col :span="8" :offset="1">
          <el-col :span="12">
            <el-form-item label="发布时间">
              <el-date-picker
                v-model="item.pbegin"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="至" label-width="25px">
              <el-date-picker
                v-model="item.pend"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <!-- 负责人 -->
        <el-col :span="4" :offset="1">
          <el-form-item label="负责人">
            <el-input v-model="item.tname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-button @click="onsearch">查询</el-button>
          <el-button @click="()=>$router.push({name:'bookClubActive',query:{data:{}}})">新增</el-button>
          <el-button
            :disabled="items.length !== 1"
            @click="()=>$router.push({name:'bookClubActive',query:{data:items[0]}})"
          >修改</el-button>
          <el-button :disabled="items.length === 0">删除</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-table :data="table.data" class="w100" border @selection-change="(v)=> items = v">
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
                v-if="scope.row.byinter.do && scope.row.byoutline.do"
              >{{ scope.row.byinter.label + ' + ' + scope.row.byoutline.label}}</span>
              <span
                v-if="scope.row.byinter.do && !scope.row.byoutline.do"
              >{{ scope.row.byinter.label }}</span>
              <span
                v-if="!scope.row.byinter.do && scope.row.byoutline.do"
              >{{ scope.row.byoutline.label }}</span>
            </span>
            <span v-if="column.code==='helper'">
              <span>{{ scope.row.helper.length }}</span>
            </span>
            <span v-if="column.code==='listener'">
              <span>{{ scope.row.listener.length }}</span>
            </span>
            <span class="yichu" v-if="column.code==='state'">
              {{
              scope.row[column.code] === 0 ? '待审核' :
              scope.row[column.code] === 20 ? '可发布' : '已发布'
              }}
            </span>
            <span
              class="yichu"
              v-if="column.code !=='bytype' && column.code !=='helper' && column.code !=='state' && column.code !=='listener'"
            >{{ scope.row[column.code] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class BookClubList extends Vue {
  log: any;
  item: any = {};
  table: any = {
    column: [
      {
        name: "读书会主题",
        code: "title"
      },
      {
        name: "举办方式",
        code: "bytype"
      },
      {
        name: "举办时间",
        code: "stime"
      },
      {
        name: "负责人",
        code: "contact"
      },
      {
        name: "志愿者人数",
        code: "helper"
      },
      {
        name: "听众",
        code: "listener"
      },
      {
        name: "发布时间",
        code: "ptime"
      },
      {
        name: "状态",
        code: "state"
      }
    ],
    data: [
      {
        title: "上海市普陀区金沙江路 1518 弄",
        contact: "王小虎",
        along: "70小时",
        stime: "2019-05-02",
        byinter: {
          do: true,
          label: "线上举办"
        },
        byoutline: {
          do: true,
          label: "线下举办"
        },
        helper: [],
        listener: [],
        ptime: "2019-03-02",
        state: 40
      },
      {
        title: "上海市普陀区金沙江路 1517 弄",
        contact: "王小虎",
        along: "60小时",
        byinter: {
          do: true,
          label: "线上举办"
        },
        byoutline: {
          do: true,
          label: "线下举办"
        },
        helper: [],
        listener: [],
        stime: "2019-05-04",
        ptime: "2019-03-04",
        state: 0
      }
    ]
  };
  items: any = [];
  onsearch() {
    this.log(this.item);
  }
}
</script>
