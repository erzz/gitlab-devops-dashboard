<template>
  <v-container>
    <v-card>
      <v-simple-table>
        <template v-slot:default>
          <caption>
            Activity
          </caption>
          <tbody>
            <tr>
              <td><v-icon>mdi-star-outline</v-icon>Stars</td>
              <td>{{ project.star_count }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-source-fork</v-icon>Forks</td>
              <td>{{ project.forks_count }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-format-list-checkbox</v-icon>Open Issues</td>
              <td>{{ project.open_issues_count }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProjectActivity',
  computed: {
    ...mapGetters({
      getProjectById: 'projects/getProjectById'
    }),
    id() {
      return this.$store.state.projects.activeProject;
    },
    project() {
      return this.getProjectById(this.id);
    }
  }
};
</script>
