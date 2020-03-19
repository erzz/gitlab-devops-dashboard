<template>
  <v-container>
    <v-card tile>
      <v-simple-table>
        <template v-slot:default>
          <caption>
            Configuration
          </caption>
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
                {{ id }}
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
              <td :class="isPrivate ? 'correct' : 'incorrect'">
                {{ project.visibility }}
              </td>
            </tr>
            <tr>
              <td>
                <v-icon>mdi-source-merge</v-icon>
                MR's Enabled
              </td>
              <td :class="project.merge_requests_enabled ? 'correct' : 'incorrect'">
                {{ project.merge_requests_enabled }}
              </td>
            </tr>
            <tr>
              <td>
                <v-icon>mdi-check-underline-circle-outline</v-icon>
                MR's Require Pipeline Success
              </td>
              <td :class="project.only_allow_merge_if_pipeline_succeeds ? 'correct' : 'incorrect'">
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
                  project.only_allow_merge_if_all_discussions_are_resolved ? 'correct' : 'incorrect'
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
              <td :class="project.remove_source_branch_after_merge ? 'correct' : 'incorrect'">
                {{ project.remove_source_branch_after_merge }}
              </td>
            </tr>
            <tr>
              <td>
                <v-icon>mdi-archive-arrow-down-outline</v-icon>
                Archived
              </td>
              <td :class="project.archived ? 'incorrect' : 'correct'">
                {{ project.archived }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import timeAgo from 'time-ago';

export default {
  name: 'ProjectConfig',
  computed: {
    ...mapGetters({
      getProjectById: 'projects/getProjectById'
    }),
    id() {
      return this.$store.state.projects.activeProject;
    },
    lastActivity() {
      const ta = timeAgo.ago(new Date(this.project.last_activity_at));
      return ta;
    },
    project() {
      return this.getProjectById(this.id);
    },
    simpleDate() {
      const date = new Date(this.project.created_at);
      const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      return formatted;
    },
    isPrivate() {
      return this.project.visibility === 'private';
    }
  }
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
