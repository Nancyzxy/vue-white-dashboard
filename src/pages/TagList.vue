<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card>
          <template slot="header">
            <div class="el-row">
              <h2 class="card-title">Here are all tags we have</h2>
            </div>
            <div class="el-row">
              <div class="col-sm-6">
                <input
                  slot="header"
                  v-model="searchQuery"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroup"
                  placeholder="SEARCH"
                />
              </div>
              <div class="col-sm-6" :class="'text-right'">
                <el-button
                  type="el-icon-search"
                  icon="el-icon-check"
                  circle
                  @click="searchClick"
                ></el-button>
              </div>
            </div>
          </template>
          <div v-show="this.flag == 1">
            <div id="wordCloud" style="height: 700px; width: 70%}"></div>
          </div>
          <div v-show="this.flag == 2">
            <div class="table-responsive text-left">
              <el-table
                border
                stripe
                :data="data"
                :default-sort="{prop: 'question_cnt', order: 'descending'}"
                style="width: 100%"
              >
                <el-table-column sortable prop="name" label="name" width="360">
                </el-table-column>
                <el-table-column
                  prop="view_count"
                  sortable
                  label="view"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="question_cnt"
                  sortable
                  label="question"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="answer_count"
                  sortable
                  label="answer"
                  width="150"
                >
                </el-table-column>
                <el-table-column label="Analysis">
                  <template v-slot="scope">
                    <el-button @click="goToAnalysis(scope.row.name)">
                      analysis
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="this.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="this.pageCount * this.pageSize"
              >
              </el-pagination>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components/index";
import axios from "axios";
import "echarts-wordcloud";
import echarts from "echarts";
import Vue from "vue";

export default {
  components: {
    Card
  },
  methods: {
    searchClick() {
      this.currentPage = 1;
      this.flag = 2;
      this.getPageCount();
      this.flash();
    },
    flash() {
      if (this.searchQuery !== "") {
        axios
          .get(
            "/search/tag/" +
              this.searchQuery +
              "/" +
              this.pageSize +
              "/" +
              this.currentPage.toString()
          )
          .then(res => {
            console.log(res);
            this.data = res.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.data = [];
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.flash();
    },
    initChart() {
      let myChart = echarts.init(document.getElementById("wordCloud"));
      const option = {
        title: {
          text: "",
          x: "center"
        },
        backgroundColor: "#fff",
        series: [
          {
            type: "wordCloud",
            gridSize: 10,
            sizeRange: [14, 40],
            rotationRange: [0, 90],
            textStyle: {
              color:
                "rgb(" +
                Math.round(Math.random() * 255) +
                ", " +
                Math.round(Math.random() * 255) +
                ", " +
                Math.round(Math.random() * 255) +
                ")"
            },
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "100%",
            height: "100%",
            data: this.echartsData
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    get50Tags() {
      axios
        .get("/getTopTagsQuick/70")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.echartsData[i].name = res.data[i].name;
          }
          this.initChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goToAnalysis(val) {
      Vue.prototype.$tag = val;
      this.$router.push({ path: "/other" });
    },
    getPageCount() {
      axios
        .get("/search/tagPageCount/" + this.searchQuery + "/" + this.pageSize)
        .then(res => {
          this.pageCount = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.flash();
    this.get50Tags();
  },
  data() {
    return {
      flag: 1, //indicate whether is a search result.
      searchQuery: "",
      data: [],
      currentPage: 1,
      pageCount: 0,
      pageSize: 10,
      echartsData: [
        { value: "30", name: "" },
        { value: "29", name: "" },
        { value: "28", name: "" },
        { value: "27", name: "" },
        { value: "26", name: "" },
        { value: "25", name: "" },
        { value: "24", name: "" },
        { value: "23", name: "" },
        { value: "22", name: "" },
        { value: "21", name: "" },
        { value: "20", name: "" },
        { value: "16", name: "" },
        { value: "15", name: "" },
        { value: "14", name: "" },
        { value: "13", name: "" },
        { value: "12", name: "" },
        { value: "11", name: "" },
        { value: "10", name: "" },
        { value: "9", name: "" },
        { value: "30", name: "" },
        { value: "29", name: "" },
        { value: "28", name: "" },
        { value: "27", name: "" },
        { value: "26", name: "" },
        { value: "25", name: "" },
        { value: "24", name: "" },
        { value: "23", name: "" },
        { value: "22", name: "" },
        { value: "21", name: "" },
        { value: "20", name: "" },
        { value: "16", name: "" },
        { value: "15", name: "" },
        { value: "14", name: "" },
        { value: "13", name: "" },
        { value: "12", name: "" },
        { value: "11", name: "" },
        { value: "10", name: "" },
        { value: "9", name: "" },
        { value: "30", name: "" },
        { value: "29", name: "" },
        { value: "28", name: "" },
        { value: "27", name: "" },
        { value: "26", name: "" },
        { value: "25", name: "" },
        { value: "24", name: "" },
        { value: "23", name: "" },
        { value: "22", name: "" },
        { value: "21", name: "" },
        { value: "20", name: "" },
        { value: "16", name: "" },
        { value: "30", name: "" },
        { value: "29", name: "" },
        { value: "28", name: "" },
        { value: "27", name: "" },
        { value: "26", name: "" },
        { value: "25", name: "" },
        { value: "24", name: "" },
        { value: "23", name: "" },
        { value: "22", name: "" },
        { value: "21", name: "" },
        { value: "20", name: "" },
        { value: "16", name: "" },
        { value: "15", name: "" },
        { value: "14", name: "" },
        { value: "13", name: "" },
        { value: "20", name: "" },
        { value: "16", name: "" },
        { value: "15", name: "" },
        { value: "14", name: "" },
        { value: "13", name: "" }
      ]
    };
  }
};
</script>
<style></style>
