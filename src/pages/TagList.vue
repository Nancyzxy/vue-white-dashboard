<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card>
          <template slot="header">
            <div class="col-sm-6">
              <h4 class="card-title">Here are all tags we have!</h4>
            </div>
            <div class="col-sm-6">
              <ul class="navbar-nav" :class="'ml-auto'">
                <li
                  class="search-bar input-group"
                  @click="searchModalVisible = true"
                >
                  <button
                    class="btn btn-link"
                    id="search-button"
                    data-toggle="modal"
                    data-target="#searchModal"
                  >
                    <i class="tim-icons icon-zoom-split"></i>
                    <span class="d-lg-none d-md-block">Search</span>
                  </button>
                </li>
                <modal
                  :show.sync="searchModalVisible"
                  class="modal-search"
                  id="searchModal"
                  :centered="false"
                  :show-close="true"
                >
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
                  <div class="col-sm-6">
                    <el-button
                      type="success"
                      icon="el-icon-check"
                      circle
                      @click="searchClick"
                    ></el-button>
                  </div>
                </modal>
              </ul>
            </div>
          </template>
          <div>
            <div id="wordCloud" style="height: 400px; width: 100%}"></div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components/index";
import Modal from "@/components/Modal.vue";
import axios from "axios";
import "echarts-wordcloud";
import echarts from "echarts";

export default {
  components: {
    Card,
    Modal
  },
  methods: {
    searchClick() {
      this.searchModalVisible = false;
      this.currentPage = 1;
      this.flag = 2;
      console.log("search title");
      console.log(this.searchQuery);
      axios
        .get("/search/" + this.searchQuery + "/question/10/" + this.currentPage)
        .then(res => {
          console.log(res);
          this.data = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    flash() {
      if (this.flag === 1) {
        axios
          .get("/getQuestionsList/10/" + this.currentPage.toString())
          .then(res => {
            this.data = res.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axios
          .get(
            "/search/" + this.searchQuery + "/question/10/" + this.currentPage
          )
          .then(res => {
            this.data = res.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
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
    },
    get50Tags() {
      axios
        .get("/getTopTags/100")
        .then(res => {
          console.log(res);
          for (let i = 0; i < res.data.length; i++) {
            this.echartsData[i].name = res.data[i].name;
          }
          this.initChart();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.get50Tags();
  },
  data() {
    return {
      flag: 1, //indicate whether is a search result.
      searchModalVisible: false,
      searchQuery: "",
      data: [],
      currentPage: 1,
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
        { value: "16", name: "" }
      ]
    };
  }
};
</script>
<style></style>
