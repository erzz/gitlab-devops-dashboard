<template>
  <v-container>
    <v-row>
      <ActiveProject />
    </v-row>
    <v-row>
      <v-col cols="6">
        <ProjectConfig />
      </v-col>
      <v-col cols="6">
        <ProjectContributors />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <ProjectActivity />
      </v-col>
      <v-col cols="6">
        <ProjectConnect />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ActiveProject from '~/components/ActiveProject.vue';
import ProjectConfig from '~/components/ProjectConfig.vue';
import ProjectContributors from '~/components/ProjectContributors.vue';
import ProjectActivity from '~/components/ProjectActivity.vue';
import ProjectConnect from '~/components/ProjectConnect.vue';

export default {
  name: 'Project',
  components: {
    ActiveProject,
    ProjectConfig,
    ProjectContributors,
    ProjectActivity,
    ProjectConnect
  },
  computed: {
    projectID() {
      return this.$store.state.projects.activeProject;
    }
  }
};
</script>
