<template>
  <v-container>
    <DeploymentStats />
  </v-container>
</template>

<script>
import DeploymentStats from '~/components/DeploymentStats.vue';

export default {
  name: 'DevOps',
  components: {
    DeploymentStats
  },
  computed: {
    projectID() {
      return this.$store.state.projects.activeProject;
    }
  }
};
</script>

<style scoped></style>
