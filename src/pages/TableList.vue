<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card>
          <template slot="header">
            <h4 class="card-title">All questions are listed here!</h4>
            <h5 class="card-category">sorted by view_count.</h5>
          </template>
          <div class="table-responsive text-left">
            <base-table
              :data="table.data"
              :columns="table.columns"
              thead-classes="text-primary"
            >
            </base-table>
          </div>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-size="20"
              layout="total, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components/index";

import BaseTable from "@/components/BaseTable";
import axios from "axios";

const tableColumns = ["title", "tag", "view_count", "link"];
const tableData = [
  {
    id: 1,
    title: "Dakota Rice",
    tag: "$36.738",
    view_count: "Niger",
    link: "Oud-Turnhout"
  }
];

export default {
  components: {
    Card,
    BaseTable
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  mounted() {
    axios
      .get("http://localhost:8080/getQuestionsList/20")
      .then(res => console.log(res))
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  },
  data() {
    return {
      table: {
        columns: [...tableColumns],
        data: [...tableData],
        currentPage: 4
      }
    };
  }
};
</script>
<style></style>
