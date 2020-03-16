<template>
   <v-container>
    <v-card
      class="mx-auto"
      max-width="80%"
      align="center"
      raised
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="../assets/devops.png"
        contain
      >
      </v-img>
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
          @click="showProjectInfo() + $store.dispatch('getDeployments', selected);"
          color="secondary"
          raised
        >
          Go
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'HomePage',
  created() {
    this.$store.dispatch('getProjects');
  },
  computed: {
    availableProjects() {
      return this.$store.state.projects;
    },
  },
  methods: {
    showProjectInfo() {
      this.$router.push({
        name: 'Repo',
        params: {
          id: this.selected,
        },
      });
    },
  },
};
</script>

<style scoped>

</style>
