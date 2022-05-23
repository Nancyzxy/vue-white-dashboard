import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Overview from "@/pages/Overview.vue";
import Icons from "@/pages/Icons.vue";
import Java from "@/pages/Java.vue";
import Python from "@/pages/Python.vue";
import Other from "@/pages/other.vue";
import QuestionList from "@/pages/QuestionList.vue";
import TagList from "@/pages/TagList.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "overview",
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Overview
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "java",
        name: "Java",
        component: Java
      },
      {
        path: "python",
        name: "Python",
        component: Python
      },
      {
        path: "other",
        name: "Other",
        component: Other
      },
      {
        path: "questionlist",
        name: "Question List",
        component: QuestionList
      },
      {
        path: "taglist",
        name: "TagList",
        component: TagList
      }
    ]
  }
];

export default routes;
