<template>
  <div class="contentList">
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
          <el-button @click="()=>$router.push({name:'contentActive',query:{data:{}}})">新增</el-button>
          <el-button
            :disabled="items.length !== 1"
            @click="()=>$router.push({name:'contentActive',query:{data:items[0]}})"
          >修改</el-button>
          <!-- 批量删除 -->
          <!-- <el-button :disabled="items.length === 0" @click="onDelete">删除</el-button> -->
          <!-- 单个删除 -->
          <el-button :disabled="items.length !== 1" @click="onDelete">删除</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="table.data"
        class="w100"
        border
        @selection-change="(v)=> items = v"
        :height="500"
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
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getContentsList, contentsDel } from "@/api/contentsApi";
@Component
export default class ContentList extends Vue {
  log: any;
  item: any = {
    // //标题
    // title: "",
    // //作者
    // anthor: "",
    // //微信成功发布时间
    // ptime: "",
    // //状态。 -1:所有(查询使用)，0:待审核，20:可发布，40:已发布
    // state: -1,
    // //子标题
    // stitle: "",
    // //类型。-1:所有(查询使用)，0:观点,20:新闻
    // type: -1,
    // //正文
    // content: "",
    // //微信发布计划开始时间
    // pubbegin: "",
    // //微信发布计划结束时间(内容列表中的预计推送时间以end为准)
    // pubend: ""
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
        name: "状态",
        code: "state"
      },
      {
        name: "二级标题",
        code: "stitle"
      },
      {
        name: "类型",
        code: "type"
      }
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
  mounted() {
    this.getContentsListFn({});
  }
  onsearch() {
    this.getContentsListFn(this.item);
  }
  async onDelete() {
    // 单个删除
    let param = {
      id: this.items[0].id
    };
    let res: any = await contentsDel(param);
    if (res.ok) {
      this.getContentsListFn({});
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
    // let res: any = await contentsDel(param);
    // if (res.ok) {
    //   this.getContentsListFn({});
    // } else {
    //   alert(res.msg);
    // }
  }
  async getContentsListFn(param: any) {
    let res: any = await getContentsList(param);
    if (res.ok) {
      this.table.data = res.data;
    } else {
      alert(res.msg);
    }
  }
}
</script>
