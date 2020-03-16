<template>
  <v-container>
    <v-card
      height="400"
      class="overflow-hidden"
    >
      <v-navigation-drawer
        drawer
        expand-on-hover
        mini-variant
        absolute
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-gitlab</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link class="menu-link" :to="{name: 'Repo' }">
                <v-list-item-title>Repository Info</v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-infinity</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link class="menu-link" :to="{name: 'DevOps' }">
                <v-list-item-title>DevOps Metrics</v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link class="menu-link" :to="{name: 'OKR' }">
                <v-list-item-title>OKR Metrics</v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped>

</style>
