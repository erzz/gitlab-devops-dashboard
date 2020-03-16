<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <v-card
          tile
        >
          <v-simple-table>
            <template v-slot:default>
              <caption>Configuration</caption>
                <tbody>
                  <tr>
                    <td>
                      <v-icon>mdi-source-repository</v-icon>
                      Project
                    </td>
                    <td>
                      {{ project.path_with_namespace }}
                    </td>
                  </tr>
                  <tr>
                  <td>
                    <v-icon>mdi-pound</v-icon>
                    ProjectID
                  </td>
                  <td>
                    {{ project.id }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-calendar-clock</v-icon>
                    Created
                  </td>
                  <td>
                    {{ simpleDate }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-timeline-clock-outline</v-icon>
                    Last Activity
                  </td>
                  <td>{{ lastActivity }}</td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-lock-outline</v-icon>
                    Visibility
                  </td>
                  <td
                    :class="isPrivate ? 'correct' : 'incorrect'"
                  >{{ project.visibility }}</td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-source-merge</v-icon>
                    MR's Enabled
                  </td>
                  <td
                    :class="project.merge_requests_enabled ? 'correct' : 'incorrect'"
                  >
                    {{ project.merge_requests_enabled }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-check-underline-circle-outline</v-icon>
                    MR's Require Pipeline Success
                  </td>
                  <td
                    :class="project.only_allow_merge_if_pipeline_succeeds ? 'correct' : 'incorrect'"
                  >
                    {{ project.only_allow_merge_if_pipeline_succeeds }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-message-outline</v-icon>
                    MR's Requires Resolve Discussions
                  </td>
                  <td
                    :class="
                    project.only_allow_merge_if_all_discussions_are_resolved
                    ? 'correct'
                    : 'incorrect'
                    "
                  >
                    {{ project.only_allow_merge_if_all_discussions_are_resolved }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-delete-sweep-outline</v-icon>
                    Delete Branch on Merge
                  </td>
                  <td
                    :class="project.remove_source_branch_after_merge ? 'correct' : 'incorrect'"
                  >
                    {{ project.remove_source_branch_after_merge }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-archive-arrow-down-outline</v-icon>
                    Archived
                  </td>
                  <td
                    :class="project.archived ? 'incorrect' : 'correct'"
                  >{{ project.archived }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-simple-table>
            <template v-slot:default>
              <caption>Top 10 Contributors</caption>
                <thead>
                  <th>Name</th><th>Commits</th><th>Additions</th><th>Deletions</th>
                </thead>
                <tbody v-for="user in contributors" v-bind:key="user" :value="user.name">
                  <tr>
                    <td><v-icon>mdi-account-circle-outline</v-icon>{{ user.name }}</td>
                    <td>{{ user.commits }}</td>
                    <td>{{ user.additions }}</td>
                    <td>{{ user.deletions }}</td>
                  </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-simple-table>
            <template v-slot:default>
              <caption>Activity</caption>
              <tbody>
                <tr>
                  <td>
                    <v-icon>mdi-star-outline</v-icon>
                    Stars
                  </td>
                  <td>
                    {{ project.star_count }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-source-fork</v-icon>
                    Forks
                  </td>
                  <td>
                    {{ project.forks_count }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-format-list-checkbox</v-icon>
                    Open Issues
                  </td>
                  <td>
                    {{ project.open_issues_count }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-simple-table>
            <template v-slot:default>
              <caption>Connect</caption>
              <tbody>
                <tr>
                  <td>
                    <v-icon>mdi-shield-link-variant-outline</v-icon>
                  </td>
                  <td>
                    <kbd>{{ project.http_url_to_repo }}</kbd>
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-ssh</v-icon>
                  </td>
                  <td>
                    <kbd>{{ project.ssh_url_to_repo }}</kbd>
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-icon>mdi-api</v-icon>
                  </td>
                  <td>
                    <kbd>{{ project._links.self }}</kbd>
                  </td>
                </tr>
            </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <!-- debug
    <div>{{ contributors }}</div> -->
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import timeAgo from 'time-ago';

export default {
  name: 'Repo',
  created() {
    this.$store.dispatch('getContributors', this.id);
  },
  computed: {
    ...mapGetters(['getProjectById']),
    id() {
      return this.$route.params.id;
    },
    contributors() {
      return this.$store.state.contributors;
    },
    project() {
      return this.getProjectById(this.id);
    },
    isPrivate() {
      return this.project.visibility === 'private';
    },
    simpleDate() {
      const date = new Date(this.project.created_at);
      const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      return formatted;
    },
    lastActivity() {
      const ta = timeAgo.ago(new Date(this.project.last_activity_at));
      return ta;
    },
  },
};
</script>

<style scoped>
caption {
  font-weight: bold;
}

.correct {
  color: #1aaa55;
}

.incorrect {
  color: #db3b21;
}
</style>
