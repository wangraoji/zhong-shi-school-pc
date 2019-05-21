<template>
  <div class="enterNameList">
    <el-row class="mb-10">
      <el-form ref="form" :model="item" label-position="left" label-width="70px">
        <!-- 名称 -->
        <el-col :span="4">
          <el-form-item label="课程名称">
            <el-input v-model="item.title"></el-input>
          </el-form-item>
        </el-col>
        <!-- 报名时间 -->
        <el-col :span="8" :offset="1">
          <el-col :span="12">
            <el-form-item label="报名时间">
              <el-date-picker
                v-model="item.rbegin"
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
                v-model="item.rend"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <!-- 教师 -->
        <el-col :span="4" :offset="1">
          <el-form-item label="教师">
            <el-input v-model="item.tname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-button @click="onsearch">查询</el-button>
          <el-button @click="()=>$router.push({name:'courseActive',query:{data:{}}})">新增</el-button>
          <el-button
            :disabled="items.length !== 1"
            @click="()=>$router.push({name:'courseActive',query:{data:items[0]}})"
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
              {{ scope.row[column.code].join(' + ') }}
            </span>
            <span
              class="yichu"
              v-if="column.code !=='bytype'"
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
export default class EnterNameList extends Vue {
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
      },
    ],
    data: [
      {
        name: "上海市普陀区金沙江路 1518 弄",
        tname: "王小虎",
        along:"70小时",
        bytype: ['直播'],
        rbegin: "2019-05-02",
        class:  "03期5月2日班",
      },
      {
        name: "上海市普陀区金沙江路 1517 弄",
        tname: "王小虎",
        along:"60小时",
        bytype: ['面授','直播'],
        rbegin: "2019-05-04",
        class: "03期5月4日班",
      }
    ]
  };
  items: any = [];
  onsearch() {
    this.log(this.item);
  }
}
</script>
