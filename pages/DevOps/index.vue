<template>
  <v-container>
    <ActiveProject />
    <DeploymentStats />
  </v-container>
</template>

<script>
import ActiveProject from '~/components/ActiveProject.vue';
import DeploymentStats from '~/components/DeploymentStats.vue';

export default {
  name: 'DevOps',
  components: {
    ActiveProject,
    DeploymentStats
  },
  computed: {
    projectID() {
      return this.$store.state.projects.activeProject;
    }
  }
};
</script>
