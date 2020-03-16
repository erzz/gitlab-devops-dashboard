import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const token = process.env.VUE_APP_GL_TOKEN;

export default new Vuex.Store({
  state: {
    projects: [],
    contributors: [],
    deployments: [],
  },
  mutations: {
    updateProjects(state, projects) {
      state.projects = projects;
    },
    updateContributors(state, contributors) {
      state.contributors = contributors;
    },
    updateDeployments(state, deployments) {
      state.deployments = deployments;
    },
  },
  actions: {
    getProjects({ commit }) {
      const groupId = process.env.VUE_APP_GL_GROUPID;
      const url = `/api/v4/groups/${groupId}/projects`;
      const options = {
        headers: { 'Private-Token': token },
        params: {
          per_page: 100,
          order_by: 'name',
          sort: 'asc',
        },
      };
      axios.get(url, options)
        .then((result) => commit('updateProjects', result.data));
    },
    getContributors({ commit }, projectId) {
      const url = `/api/v4/projects/${projectId}/repository/contributors`;
      const options = {
        headers: {
          'Private-Token': token,
        },
        params: {
          order_by: 'commits',
          sort: 'desc',
          per_page: 10,
        },
      };
      axios.get(url, options)
        .then((result) => commit('updateContributors', result.data));
    },
    async getDeployments({ commit }, projectId) {
      const url = `/api/v4/projects/${projectId}/deployments`;
      let options = {
        headers: {
          'Private-Token': token,
        },
        params: {
          order_by: 'created_at',
          sort: 'desc',
          per_page: 100,
        },
      };
      // Special temp hack for pagination
      const pages = await axios.head(url, options)
        .then((response) => response.headers['x-total-pages']);
      const promises = [];
      for (let i = 0; i <= pages; i += 1) {
        options = {
          headers: {
            'Private-Token': token,
          },
          params: {
            order_by: 'created_at',
            sort: 'desc',
            per_page: 100,
            page: i,
          },
        };
        const promise = axios.get(url, options);
        promises.push(promise);
      }
      const items = [];
      Promise.all(promises)
        .then((result) => {
          for (let i = 0; i <= pages; i += 1) {
            result[i].data.forEach((item) => {
              items.push({
                id: item.id,
                ref: item.ref,
                get environment() {
                  if (item.environment.name.match(/.*\/production.*/)) {
                    return 'production';
                  } if (item.environment.name.match(/.*\/staging.*/)) {
                    return 'staging';
                  }
                  return 'feature';
                },
                created_at: item.created_at,
                updated_at: item.updated_at,
                status: item.deployable
                  && item.deployable.pipeline
                  && item.deployable.pipeline.status
                  ? item.deployable.pipeline.status
                  : null,
                pipe_created_at: item.deployable
                  && item.deployable.pipeline
                  && item.deployable.pipeline.created_at
                  ? item.deployable.pipeline.created_at
                  : null,
                pipe_updated_at: item.deployable
                  && item.deployable.pipeline
                  && item.deployable.pipeline.updated_at
                  ? item.deployable.pipeline.updated_at
                  : null,
                get pipe_duration() {
                  return (Date.parse(this.pipe_updated_at) - Date.parse(this.pipe_created_at));
                },
              });
            });
          }
          commit('updateDeployments', items);
        });
    },
  },
  getters: {
    getProjectById: (state) => (id) => state.projects.find((project) => project.id === +id),
  },
});
