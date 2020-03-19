<template>
  <v-navigation-drawer app drawer expand-on-hover mini-variant clipped color="secondary" dark>
    <v-list dense nav class="py-0">
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-gitlab</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <router-link :to="{ name: 'Project' }">
            <v-list-item-title>Project Overview</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-infinity</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <router-link :to="{ name: 'DevOps' }">
            <v-list-item-title>DevOps Metrics</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <router-link :to="{ name: 'OKR' }">
            <v-list-item-title>OKR Metrics</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
