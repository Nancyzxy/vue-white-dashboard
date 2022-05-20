<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h3 class="card-title">All questions are listed here</h3>
            <h5 class="card-category">Sorted by view_count</h5>
          </template>
          <div class="table-responsive" >
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Card
} from "@/components/index";
import UserTable from "@/pages/Dashboard/UserTable";

 export default {
   components: {
     Card,
     UserTable
   },
   mounted() {
     this.i18n = this.$i18n;
     this.i18n.locale = "en";
   },
   beforeDestroy() {
     this.i18n.locale = "en";
   }
 }
</script>
<style>
</style>
