import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Icons from "@/pages/Icons.vue";
import Java from "@/pages/Java.vue";
import Python from "@/pages/Python.vue";
import UserProfile from "@/pages/UserProfile.vue";
import QuestionList from "@/pages/QuestionList.vue";
import Typography from "@/pages/Typography.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "overview",
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Dashboard
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
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "questionlist",
        name: "Question List",
        component: QuestionList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      }
    ]
  }
];

export default routes;
