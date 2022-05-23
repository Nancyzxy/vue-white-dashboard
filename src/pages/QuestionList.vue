<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card>
          <template slot="header">
            <div class="col-sm-6">
              <h4 class="card-title">All questions are listed here!</h4>
              <h5 class="card-category">sorted by view_count.</h5>
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
                      type="el-icon-search"
                      icon="el-icon-check"
                      circle
                      @click="searchClick"
                    ></el-button>
                  </div>
                </modal>
              </ul>
            </div>
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
              :page-size="this.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="this.pageCount * this.pageSize"
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
import Modal from "@/components/Modal.vue";
import axios from "axios";

export default {
  components: {
    Card,
    Modal
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
    searchClick() {
      this.searchModalVisible = false;
      this.currentPage = 1;
      if (this.searchQuery !== "") {
        this.flag = 2;
        this.getPageCount();
        this.flash();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.flash();
    },
    flash() {
      if (this.flag === 1) {
        axios
          .get(
            "/getQuestionsList/" +
              this.pageSize +
              "/" +
              this.currentPage.toString()
          )
          .then(res => {
            this.data = res.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axios
          .get(
            "/search/" + this.searchQuery + "/question/"+this.pageSize+"/" + this.currentPage
          )
          .then(res => {
            this.data = res.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    getPageCount() {
      if (this.flag === 1) {
        axios
          .get("/getPageCount/" + this.pageSize)
          .then(res => {
            this.pageCount = res.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axios
          .get(
            "/search/" +
              this.searchQuery +
              "/questionPageCount/" +
              this.pageSize
          )
          .then(res => {
            console.log(res.data);
            this.pageCount = res.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    this.getPageCount();
    this.flash();
  },
  data() {
    return {
      flag: 1, //indicate whether is a search result.
      searchModalVisible: false,
      searchQuery: "",
      data: [],
      currentPage: 1,
      pageCount: 0,
      pageSize:10,
    };
  }
};
</script>
<style></style>
