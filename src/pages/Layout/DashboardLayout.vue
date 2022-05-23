<template>
  <div class="wrapper">
    <side-bar :background-color="backgroundColor">
      <sidebar-link to="/overview">
        <i class="tim-icons icon-atom"></i>
        <template>
          <p>Overview</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/questionlist">
        <i class="tim-icons icon-planet"></i>
        <template>
          <p>QUESTIONLIST</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/taglist">
        <i class="tim-icons icon-planet"></i>
        <template>
          <p>TagList</p>
        </template>
      </sidebar-link>
<!--      <sidebar-link to="/icons">-->
<!--        <i class="tim-icons icon-planet"></i>-->
<!--        <template>-->
<!--          <p>icons</p>-->
<!--        </template>-->
<!--      </sidebar-link>-->
      <sidebar-link to="/java">
        <i class="tim-icons icon-bell-55"></i>
        <template>
          <p>JAVA</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/python">
        <i class="tim-icons icon-bell-55"></i>
        <template>
          <p>PYTHON</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/other">
        <i class="tim-icons icon-bell-55"></i>
        <template>
          <p>OTHER</p>
        </template>
      </sidebar-link>
    </side-bar>
    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>
      <!--dashboard 中通过router-view来进行组件替换-->
      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink
  },
  data() {
    return {
      backgroundColor: "green"
    };
  },
  computed: {},
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
