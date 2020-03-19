<template>
  <v-footer>
    <v-spacer></v-spacer>
    <v-row>
      <v-card class="text-center">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon href="https://gitlab.com/retail-pim" target="_blank" v-on="on">
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
</template>

<script>
export default {
  name: 'BottomMenu'
};
</script>
