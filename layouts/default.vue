<template>
  <v-app dark>
    <v-row>
      <v-col cols="12">
        <TopMenu />
      </v-col>
    </v-row>
    <v-row>
      <SideMenu />
      <v-container>
        <nuxt />
      </v-container>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BottomMenu />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import TopMenu from '~/components/TopMenu.vue';
import BottomMenu from '~/components/BottomMenu.vue';
import SideMenu from '~/components/SideMenu.vue';

export default {
  components: {
    TopMenu,
    BottomMenu,
    SideMenu
  }
};
</script>
