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
            <span class="demonstration">完整功能</span>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
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
