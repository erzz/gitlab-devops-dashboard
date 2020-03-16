import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../components/HomePage.vue';
import ProjectInfo from '../components/ProjectInfo.vue';
import RepoBasics from '../components/RepoBasics.vue';
import DevOps from '../components/DevOps.vue';
import OKR from '../components/OKR.vue';
// import Sidebar from '../components/Sidebar.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
    },
  },
  {
    path: '/projects/:id',
    name: 'Projects',
    components: {
      default: ProjectInfo,
    },
    children: [
      {
        path: '',
        component: RepoBasics,
      },
      {
        name: 'Repo',
        path: 'repo',
        component: RepoBasics,
      },
      {
        name: 'DevOps',
        path: 'devops',
        component: DevOps,
      },
      {
        name: 'OKR',
        path: 'okr',
        component: OKR,
      },
    ],
  },
  ],
});
