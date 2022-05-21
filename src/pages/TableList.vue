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
            <el-table border stripe :data="data" style="width: 100%">
              <el-table-column prop="question_title" label="title" width="360">
              </el-table-column>
              <el-table-column
                prop="tags"
                label="tags"
                width="180"
                :formatter="fileData"
              >
              </el-table-column>
              <el-table-column prop="question_link" label="link">
                <template v-slot="scope">
                  <a :href="scope.row.question_link">
                    {{ scope.row.question_link }}
                  </a>
                </template>
              </el-table-column>
              <el-table-column prop="view_count" label="view_count" width="120">
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="500000"
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

import axios from "axios";

export default {
  components: {
    Card
  },
  methods: {
    fileData(row) {
      let arr = [];
      // eslint-disable-next-line no-unused-vars
      row.tags.forEach((item, _) => {
        arr.push(item);
      });
      return arr.join(", ");
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      this.flash();
    },
    flash() {
      axios
        .get("/getQuestionsList/10/" + this.currentPage.toString())
        .then(res => {
          this.data = res.data;
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.flash();
  },
  data() {
    return {
      data: [],
      currentPage: 1
    };
  }
};
</script>
<style></style>
