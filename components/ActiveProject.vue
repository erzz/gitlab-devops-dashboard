<template>
  <v-container>
    <v-subheader>
      <h2>Project: {{ project.name }}</h2>
    </v-subheader>
    <v-divider></v-divider>
    <v-subheader pa="2">
      <h4>(Project ID: {{ project.id }})</h4>
    </v-subheader>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
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
