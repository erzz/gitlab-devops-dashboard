<template>
  <v-container pa="2" ma="2">
    <v-subheader>
      <h2>Project: {{ project.name }}</h2>
    </v-subheader>
    <v-divider></v-divider>
    <v-subheader pa="2">
      <h4>(Project ID: {{ project.id }})</h4>
    </v-subheader>
    <main>
      <router-view></router-view>
    </main>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProjectInfo',
  computed: {
    ...mapGetters(['getProjectById']),
    id() {
      return this.$route.params.id;
    },
    project() {
      return this.getProjectById(this.id);
    },
  },
};
</script>

<style scoped>

</style>
