<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="'text-left'">
                <template>
                  <h3 class="card-title">
                    Total Questions : {{ questionNum }}
                  </h3>
                </template>
                <template>
                  <h3 class="card-title">Total Tags : {{ tagNum }}</h3>
                </template>
                <template>
                  <el-tag>
                    {{ descrption[BigBarGraph.activeIndex] }}
                  </el-tag>
                  <el-button @click="downloadBar">
                    download
                  </el-button>
                </template>
              </div>
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  data-toggle="buttons"
                  :class="'float-right'"
                >
                  <template>
                    <label
                      v-for="(option, index) in BigBarGraphCategories"
                      :key="option"
                      class="btn btn-success btn-sm btn-simple"
                      :class="{ active: BigBarGraph.activeIndex === index }"
                      :id="index"
                    >
                      <input
                        type="radio"
                        @click="initBigChart(index)"
                        name="options"
                        autocomplete="off"
                        :checked="BigBarGraph.activeIndex === index"
                      />
                      {{ option }}
                    </label>
                  </template>
                </div>
              </div>
            </div>
          </template>
          <!-- chart的内容 -->
          <bar-chart
            class="chart-area"
            ref="bigChart"
            id="bigChart"
            chart-id="big-line-chart"
            :chart-data="BigBarGraph.chartData"
            :gradient-stops="BigBarGraph.gradientStops"
            :extra-options="BigBarGraph.extraOptions"
          >
          </bar-chart>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12" :class="'text-left'">
        <card type="chart" cardCol>
          <template slot="header">
            <h3 class="card-title">
              Percentage of answered questions
            </h3>
            <el-button @click="downloadPie1">
              download
            </el-button>
          </template>
          <el-row>
            <div id="chartPie" style="width:100%; height:400px;"></div>
          </el-row>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card type="chart" cardCol>
          <template slot="header">
            <h3 class="card-title">
              Percentage of positive scored questions
            </h3>
            <el-button @click="downloadPie2">
              download
            </el-button>
          </template>
          <el-row>
            <div id="chartPie_" style="width:100%; height:400px;"></div>
          </el-row>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components/index";
import echarts from "echarts";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import axios from "axios";

export default {
  components: {
    Card,
    BarChart
  },
  data() {
    return {
      topTag: 30,
      chartPie: null,
      answer: 0,
      notAnswered: 0,
      positiveScored: 0,
      negativeScored: 0,
      questionNum: 0,
      tagNum: 0,
      chartLabels: [],
      BigBarGraphCategories: [
        "QuestionCount",
        "ViewCount",
        "AnswerCount",
        "Score"
      ],
      descrption: [
        "This chart describes the number of questions the tags have",
        "This chart describes the times the tags have been watched",
        "This chart describes the number of answers the tags' questions have",
        "This chart describes the highest scores of the tags' questions",
        "This chart describes the lowermost scores of the tags' questions"
      ],
      BigBarGraph: {
        allData: [[], [], [], [], []],
        activeIndex: 0,
        chartData: { datasets: [{}] },
        extraOptions: chartConfigs.barChartOptions,
        gradientStops: [1, 0.4, 0],
        categories: []
      }
    };
  },
  computed: {},
  methods: {
    getQuestionCount() {
      axios
        .get("/getQuestionCount")
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
        .get("/getAnswerCountLarger0")
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
    getTopTags() {
      axios
        .get("/getTopTags/" + this.topTag)
        .then(res => {
          let tags = res.data;
          console.log(tags);
          for (let i = 0; i < tags.length; i++) {
            this.chartLabels.push(tags[i].name);
            this.BigBarGraph.allData[0].push(tags[i].question_cnt);
            this.BigBarGraph.allData[1].push(tags[i].view_count);
            this.BigBarGraph.allData[2].push(tags[i].answer_count);
            this.BigBarGraph.allData[3].push(tags[i].score_total);
          }
          this.initBigChart(0);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.BigBarGraph.allData[index]
          }
        ],
        labels: this.chartLabels
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.BigBarGraph.chartData = chartData;
      this.BigBarGraph.activeIndex = index;
    },
    getTagCount() {
      axios
        .get("/getTagCount")
        .then(res => {
          this.tagNum = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getScore() {
      axios
        .get("/getScoreCountLarger0")
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
              { value: this.positiveScored, name: "positiveScored" },
              { value: this.negativeScored, name: "negativeScored" }
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
    downloadBar() {
      let mychart = document.getElementsByTagName("canvas")[0];
      let image = mychart.toDataURL("image/png");
      let $a = document.createElement("a");
      $a.setAttribute("href", image);
      $a.setAttribute("download", "echarts.png");
      $a.click();
    },
    downloadPie1() {
      let mychart = document.getElementsByTagName("canvas")[1];
      let image = mychart.toDataURL("image/png");
      let $a = document.createElement("a");
      $a.setAttribute("href", image);
      $a.setAttribute("download", "echarts.png");
      $a.click();
    },
    downloadPie2() {
      let mychart = document.getElementsByTagName("canvas")[2];
      let image = mychart.toDataURL("image/png");
      let $a = document.createElement("a");
      $a.setAttribute("href", image);
      $a.setAttribute("download", "echarts.png");
      $a.click();
    }
  },
  created() {
    this.getTagCount();
    this.getQuestionCount();
    this.getTopTags();
  },
  mounted() {}
};
</script>
<style></style>
