<template>
  <v-app>
    <v-container>
      <v-app-bar
        app
        light
        color="primary"
      >
        <v-icon class="mr-2">mdi-sofa</v-icon>
        <span>Rangers Dashboard</span>
        <v-spacer></v-spacer>
        <v-btn
          href="/"
          color="secondary"
        >
          <span class="mr-2">Change Project</span>
          <v-icon>mdi-swap-horizontal</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer app
        drawer
        expand-on-hover
        mini-variant
        clipped
        color="secondary"
        dark
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
              <router-link :to="{name: 'Repo' }">
                <v-list-item-title>Repository Info</v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-infinity</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link :to="{name: 'DevOps' }">
                <v-list-item-title>DevOps Metrics</v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <router-link :to="{name: 'OKR' }">
                <v-list-item-title>OKR Metrics</v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-flex>
        <v-content>
          <v-card        >
            <router-view />
          </v-card>
        </v-content>
      </v-flex>
      <v-footer
        app
      >
        <v-spacer></v-spacer>
        <v-row>
          <v-card class="text-center">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  href="https://gitlab.com/retail-pim"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon>mdi-gitlab</v-icon>
                </v-btn>
              </template>
              <span>RPIM Source Code</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  href="https://jira.digital.ingka.com/secure/RapidBoard.jspa?rapidView=51&view=planning"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon>mdi-jira</v-icon>
                </v-btn>
              </template>
              <span>RPIM Backlog</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  href="https://confluence.build.ingka.ikea.com/display/RPIM/Retail+PIM+Home"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <span>RPIM Docs</span>
            </v-tooltip>
          </v-card>
        </v-row>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'App',

};
</script>

<style scoped>
  .router-link-active {
    color: "red";
  }
</style>
