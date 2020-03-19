<template>
  <v-container>
    <v-card>
      <v-simple-table>
        <template v-slot:default>
          <caption>
            Top 10 Contributors
          </caption>
          <thead>
            <th>Name</th>
            <th>Commits</th>
            <th>Additions</th>
            <th>Deletions</th>
          </thead>
          <tbody v-for="user in contributors" :key="user" :value="user.name">
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
  </v-container>
</template>
<script>
export default {
  name: 'ProjectContributors',
  computed: {
    id() {
      return this.$store.state.projects.activeProject;
    },
    contributors() {
      return this.$store.state.projects.contributors;
    }
  }
};
</script>
