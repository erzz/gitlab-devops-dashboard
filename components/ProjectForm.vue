<template>
  <v-container>
    <!-- debug -->
    <div>{{ projectID }}</div>
    <v-card class="mx-auto" max-width="80%" align="center" raised>
      <v-img class="white--text align-end" height="200px" src="../devops.png" contain> </v-img>
      <v-card-subtitle>To get started, choose a project below:</v-card-subtitle>
      <v-card-text>
        <v-select
          id="projectSelect"
          v-model="selected"
          label="Choose a project..."
          :items="availableProjects"
          item-text="name"
          item-value="id"
        />
        <v-btn
          color="secondary"
          raised
          @click="
            $store.dispatch('projects/setActiveProject', selected) +
              $store.dispatch('projects/getContributors', selected) +
              $store.dispatch('deployments/getDeployments', selected) +
              showProjectInfo()
          "
        >
          Go
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ProjectForm',
  computed: {
    availableProjects() {
      return this.$store.state.projects.projects;
    },
    projectID() {
      return this.$store.state.projects.activeProject;
    }
  },
  created() {
    this.$store.dispatch('projects/getProjects');
  },
  methods: {
    showProjectInfo() {
      this.$router.push({
        name: 'Project'
      });
    }
  }
};
</script>
