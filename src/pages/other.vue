<template>
  <div class="content">
    <div class="row">
      <card type="chart">
        <template slot="header">
          <el-tag>
            {{ this.tag }}
          </el-tag>
        </template>
        <el-row>
          <div id="barChart" style="width:100%; height:400px;"></div>
        </el-row>
      </card>
    </div>
    <div class="row">
      <div class="col-lg-5 col-md-12" :class="'text-left'">
        <card type="chart" cardCol>
          <template slot="header">
            <h3 class="card-title">
              Percentage of answered questions
            </h3>
          </template>
          <el-row>
            <div id="chartPie" style="width:100%; height:400px;"></div>
          </el-row>
        </card>
      </div>
      <div class="col-lg-5 col-md-12">
        <card type="chart" cardCol>
          <template slot="header">
            <h3 class="card-title">
              Percentage of positive scored questions
            </h3>
          </template>
          <el-row>
            <div id="chartPie_" style="width:100%; height:400px;"></div>
          </el-row>
        </card>
      </div>
      <div class="col-lg-2 col-md-12">
        <card type="chart" cardCol>
          <template slot="header">
            <h3 class="card-title">
              Related Tags
            </h3>
          </template>
          <el-row>
            <el-tag
                v-for="item in items"
                :key="item.label"
                :type="item.type"
                effect="dark"
            >
              {{ item.label }}
            </el-tag>
          </el-row>
        </card>
      </div>
    </div>
    <card type="chart">
      <template slot="header">
        <template>
          <h3 class="card-title">Total Questions : {{ questionNum }}</h3>
        </template>
      </template>
      <el-table border stripe :data="data" style="width: 100%">
        <el-table-column prop="question_title" label="title" width="360">
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
      <div class="block">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="this.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="this.pageSize * this.pageCount"
        >
        </el-pagination>
      </div>
    </card>
  </div>
</template>
<script>
import { Card } from "@/components/index";
import echarts from "echarts";
import axios from "axios";

export default {
  components: {
    Card
  },
  data() {
    return {
      data: [],
      tag: this.$tag,
      items: [
        { type: "", label: "" },
        { type: "success", label: "" },
        { type: "info", label: "" },
        { type: "danger", label: "" },
        { type: "warning", label: "" },
        { type: "", label: "" },
        { type: "success", label: "" },
        { type: "info", label: "" },
        { type: "danger", label: "" },
        { type: "warning", label: "" },
        { type: "", label: "" },
        { type: "success", label: "" },
        { type: "info", label: "" },
        { type: "danger", label: "" },
        { type: "warning", label: "" },
        { type: "", label: "" }
      ],
      range: [
        "<0",
        "0-100",
        "100-500",
        "500-1000",
        "1000-5000",
        "5000-10000",
        ">10000"
      ],
      currentPage: 1,
      chartPie: null,
      answer: 0,
      notAnswered: 0,
      positiveScored: 0,
      negativeScored: 0,
      questionNum: 0,
      barData: [0, 0, 0, 0, 0, 0, 0],
      pageCount: 0,
      pageSize: 5,
      relatedTagNum: 16
    };
  },
  methods: {
    getQuestionCount() {
      axios
          .get("/" + this.tag + "/question_count")
          .then(res => {
            this.questionNum = res.data;
            this.getAnswered();
            this.getScore();
          })
          .catch(function(error) {
            console.log(error);
          });
    },
    getAnswered() {
      axios
          .get("/" + this.tag + "/getScoreCountLarger0")
          .then(res => {
            this.answer = res.data;
            this.notAnswered = this.questionNum - this.answer;
            this.drawPieChart();
          })
          .catch(function(error) {
            console.log(error);
          });
    },
    drawPieChart() {
      let chartPie = echarts.init(document.getElementById("chartPie"));
      chartPie.setOption({
        title: {},
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "right",
          data: ["answered", "not answered"]
        },
        series: [
          {
            name: "questions that are",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.answer, name: "answered" },
              { value: this.notAnswered, name: "not answered" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      window.addEventListener("resize", function() {
        chartPie.resize();
      });
    },
    getScore() {
      axios
          .get("/" + this.tag + "/getAnswerCountLarger0")
          .then(res => {
            this.positiveScored = res.data;
            this.negativeScored = this.questionNum - this.positiveScored;
            this.drawPieChart_();
          })
          .catch(function(error) {
            console.log(error);
          });
    },
    drawPieChart_() {
      let chartPie_ = echarts.init(document.getElementById("chartPie_"));
      chartPie_.setOption({
        title: {},
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "right",
          data: ["positiveScored", "negativeScored"]
        },
        series: [
          {
            name: "questions that are",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.positiveScored, name: "positive" },
              { value: this.negativeScored, name: "negative" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      window.addEventListener("resize", function() {
        chartPie_.resize();
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.flash();
    },
    flash() {
      axios
          .get(
              "/" + this.tag + "/question/" + this.pageSize + "/" + this.currentPage
          )
          .then(res => {
            this.data = res.data;
          })
          .catch(function(error) {
            console.log(error);
          });
    },
    barGraph() {
      var myChart = echarts.init(document.getElementById("barChart"));
      let category = [
        this.range[0],
        this.range[1],
        this.range[2],
        this.range[3],
        this.range[4],
        this.range[5],
        this.range[6]
      ];
      let barData = this.barData;
      let option = {
        title: {
          text: " The score of the questions"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: { show: false },
          axisLabel: { show: false }
        },
        yAxis: {
          type: "category",
          data: category,
          splitLine: { show: false },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          offset: 10,
          nameTextStyle: {
            fontSize: 10
          }
        },
        series: [
          {
            name: "Number",
            type: "bar",
            data: barData,
            barWidth: 14,
            barGap: 10,
            smooth: true,
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [5, -2],
                textStyle: {
                  color: "#333",
                  fontSize: 13
                }
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              },
              normal: {
                barBorderRadius: 7,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#3977E6" },
                  { offset: 1, color: "#37BBF8" }
                ])
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    getRelatedTags() {
      axios
          .get("tag/" + this.tag + "/" + this.relatedTagNum + "/relationQuick")
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              this.items[i].label = res.data[i].name;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
    },
    getBarData() {
      let limit = [-20, 0, 100, 500, 1000, 5000, 10000, 20000];
      for (let i = 0; i < limit.length - 1; i++) {
        axios
            .get(
                "/tag/" + this.tag + "/" + limit[i] + "/" + limit[i + 1] + "/score"
            )
            .then(res => {
              this.barData[i] = res.data;
              this.barGraph();
            })
            .catch(function(error) {
              console.log(error);
            });
      }
    },
    getPageCount() {
      axios
          .get("/" + this.tag + "/getPageCount/" + this.pageSize)
          .then(res => {
            this.pageCount = res.data;
          })
          .catch(function(error) {
            console.log(error);
          });
    }
  },
  created() {
    this.getQuestionCount();
  },
  mounted() {
    this.getPageCount();
    this.flash();
    this.getBarData();
    this.getRelatedTags();
  }
};
</script>
<style></style>
