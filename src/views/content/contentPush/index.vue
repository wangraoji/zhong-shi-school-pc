<template>
  <div class="contentPush">
    <el-row class="mb-10">
      <el-form ref="form" :model="item" label-position="left" label-width="70px">
        <!-- 标题 -->
        <el-col :span="4">
          <el-form-item label="标题">
            <el-input v-model="item.title"></el-input>
          </el-form-item>
        </el-col>
        <!-- 发布时间 -->
        <el-col :span="8" :offset="1">
          <el-col :span="12">
            <el-form-item label="发布时间">
              <el-date-picker
                v-model="item.pubbegin"
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
                v-model="item.pubend"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <!-- 作者 -->
        <el-col :span="4" :offset="1">
          <el-form-item label="作者">
            <el-input v-model="item.anthor"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-button @click="onsearch">查询</el-button>
          <el-button :disabled="items.length === 0">取消推送</el-button>
          <el-button :disabled="items.length === 0">一键推送</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="table.data"
        class="w100"
        border
        @selection-change="(v)=> items = v"
        :height="'100%'"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column
          v-for="(column,i) of table.column"
          :key="i"
          :label="column.name"
          :width="column.width"
        >
          <template slot-scope="scope">
            <span class="yichu" v-if="column.code==='type'">
              {{
              scope.row[column.code] === 0 ? '观点' : '新闻'
              }}
            </span>
            <span class="yichu" v-if="column.code !=='type'">{{ scope.row[column.code] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ContentPush extends Vue {
  log: any;
  item: any = {
    //标题
    title: "",
    //作者
    anthor: "",
    //微信成功发布时间
    ptime: "",
    //状态。 -1:所有(查询使用)，0:待审核，20:可发布，40:已发布
    state: -1,
    //子标题
    stitle: "",
    //类型。-1:所有(查询使用)，0:观点,20:新闻
    type: -1,
    //正文
    content: "",
    //微信发布计划开始时间
    pubbegin: "2019/9/9 00:00:00",
    //微信发布计划结束时间(内容列表中的预计推送时间以end为准)
    pubend: "2019/9/9 00:00:00"
  };
  table: any = {
    column: [
      {
        name: "标题",
        code: "title"
      },
      {
        name: "作者",
        code: "anthor"
      },
      {
        name: "创建时间",
        code: "pubbegin"
      },
      {
        name: "发布时间",
        code: "ptime"
      },
      {
        name: "类型",
        code: "type"
      },
      {
        name: "预计推送日期",
        code: "pubend"
      }
    ],
    data: [
      {
        title: "上海市普陀区金沙江路 1518 弄",
        anthor: "王小虎",
        pubbegin: "2019-09-15",
        ptime: "2016-05-02",
        type: 0,
        pubend: "2019-09-26"
      },
      {
        title: "上海市普陀区金沙江路 1517 弄",
        anthor: "王小虎",
        pubbegin: "2019-05-13",
        ptime: "2016-05-04",
        type: 20,
        pubend: "2019-05-17"
      }
    ]
  };
  items: any = [];
  onsearch() {
    this.log(this.item);
  }
}
</script>
