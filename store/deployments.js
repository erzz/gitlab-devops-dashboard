import axios from 'axios';
const token = process.env.GITLAB_API_KEY;

export const state = () => ({
  deployments: [],
  loading: false,
  error: false,
  message: null
});

export const mutations = {
  updateDeployments(state, deployments) {
    state.deployments = deployments;
  },
  updateLoadingStatus(state, status) {
    state.loading = status;
  },
  updateErrorStatus(state, status, message) {
    state.error = status;
    state.message = message;
  }
};

export const actions = {
  async getDeployments({ commit }, projectId) {
    commit('updateLoadingStatus', true);
    // Define the basis of the pagination - max per_page setting at Gitlab is 100
    const url = `/api/v4/projects/${projectId}/deployments`;
    let options = {
      headers: {
        'Private-Token': token
      },
      params: {
        order_by: 'created_at',
        sort: 'desc',
        per_page: 100
      }
    };
    // Construct a set of promises based on the number of pages that
    // will need to be iterated through for a full set of results
    let pages = 0;
    const promises = [];
    try {
      pages = await axios.head(url, options).then((response) => response.headers['x-total-pages']);
    } catch (err) {
      commit('updateErrorStatus', true, 'Failed to get pages - perhaps Gitlab is down:' + err);
    } finally {
      for (let i = 0; i <= pages; i += 1) {
        options = {
          headers: {
            'Private-Token': token
          },
          params: {
            order_by: 'created_at',
            sort: 'desc',
            per_page: 100,
            page: i
          }
        };
        const promise = axios.get(url, options);
        promises.push(promise);
      }
    }
    // Iterate through the constructed list of pages and filter the reponses into a usable state.
    const items = [];
    Promise.all(promises).then((result) => {
      for (let i = 0; i <= pages; i += 1) {
        result[i].data.forEach((item) => {
          items.push({
            id: item.id,
            ref: item.ref,
            get environment() {
              if (item.environment.name.match(/.*\/production.*/)) {
                return 'production';
              }
              if (item.environment.name.match(/.*\/staging.*/)) {
                return 'staging';
              }
              return 'feature';
            },
            created_at: item.created_at,
            updated_at: item.updated_at,
            status:
              item.deployable && item.deployable.pipeline && item.deployable.pipeline.status
                ? item.deployable.pipeline.status
                : null,
            pipe_created_at:
              item.deployable && item.deployable.pipeline && item.deployable.pipeline.created_at
                ? item.deployable.pipeline.created_at
                : null,
            pipe_updated_at:
              item.deployable && item.deployable.pipeline && item.deployable.pipeline.updated_at
                ? item.deployable.pipeline.updated_at
                : null,
            get pipe_duration() {
              return Date.parse(this.pipe_updated_at) - Date.parse(this.pipe_created_at);
            }
          });
        });
      }
      commit('updateDeployments', items);
      commit('updateLoadingStatus', false);
    });
  }
};
