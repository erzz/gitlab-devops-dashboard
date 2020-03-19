<template>
  <v-container>
    <v-card>
      <v-simple-table>
        <template v-slot:default>
          <caption>
            Connect
          </caption>
          <tbody>
            <tr>
              <td><v-icon>mdi-shield-link-variant-outline</v-icon></td>
              <td>
                <kbd>{{ project.http_url_to_repo }}</kbd>
              </td>
            </tr>
            <tr>
              <td><v-icon>mdi-ssh</v-icon></td>
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
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProjectConnect',
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
