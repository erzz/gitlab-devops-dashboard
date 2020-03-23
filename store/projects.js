import axios from 'axios';
const groupId = process.env.GITLAB_GROUPID;
const token = process.env.GITLAB_API_KEY;

export const state = () => ({
  activeProject: null,
  projects: [],
  contributors: [],
  loading: false,
  error: null
});

export const mutations = {
  updateLoadingStatus(state, status) {
    state.loading = status;
  },
  updateProjects(state, projects) {
    state.projects = projects;
  },
  updateContributors(state, contributors) {
    state.contributors = contributors;
  },
  setActiveProject(state, projectId) {
    state.activeProject = projectId;
  }
};

export const actions = {
  getProjects({ commit }) {
    commit('updateLoadingStatus', true);
    const url = `https://gitlab.com/api/v4/groups/${groupId}/projects`;
    const options = {
      headers: { 'Private-Token': token },
      params: {
        per_page: 100,
        order_by: 'name',
        sort: 'asc'
      }
    };
    axios.get(url, options).then((result) => commit('updateProjects', result.data));
    commit('updateLoadingStatus', false);
  },
  setActiveProject({ commit }, projectId) {
    commit('setActiveProject', projectId);
  },
  getContributors({ commit }, projectId) {
    commit('updateLoadingStatus', true);
    const url = `https://gitlab.com/api/v4/projects/${projectId}/repository/contributors`;
    const options = {
      headers: { 'Private-Token': token },
      params: {
        order_by: 'commits',
        sort: 'desc',
        per_page: 10
      }
    };
    axios.get(url, options).then((result) => commit('updateContributors', result.data));
    commit('updateLoadingStatus', false);
  }
};

export const getters = {
  getProjectById: (state) => (id) => state.projects.find((project) => project.id === +id)
};
