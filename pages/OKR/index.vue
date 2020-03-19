<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card color="secondary" dark>
          <v-list-item two-line>
            <v-list-item-title>
              OKR 1: We will ensure that all our Products have a high quality and relevant quantity
              of defining information
            </v-list-item-title>
            <v-list-item-subtitle>
              so that our customers are increasing usage of IKEA.com filters and and search
              functionalities
            </v-list-item-subtitle>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-list-item>
            <v-list-item-content>
              KR1: Reduce by xx% the number of rows in Failed report for filter in Bedroom.
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              KR2: The full range is covered by at least 3 filters (except food range).
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              KR3: All OWF step 3 Markets are using BÄTTRA for handling NEW tag Hazard tag.
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              NEW Tag is fully handled in BÄTTRA by both global and markets with more flexibility
              and automation making their work faster (gain of time / number of iDesk tickets)
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card color="secondary" dark>
          <v-list-item two-line>
            <v-list-item-title dark>
              OKR 2 The RPIM team will be rolling and delivering business value like a Swiss watch.
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-list-item>
            <v-list-item-content>
              KR1: Bi-weekly exploration day. Kalle
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              KR2: How long to deliver a finished feature/branch into production (technical)
              Baseline.
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              KR3: Improve the team's delivery cadence by 50% from the beginning of T2
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              KR4: Decrease average time by 50% for an issue (bugs & stories) from backlog to Done &
              In progress to Done.
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card color="secondary" dark>
          <v-list-item two-line>
            <v-list-item-title dark>
              OKR 3 Our users are happily and efficiently using a super performing BÄTTRA
            </v-list-item-title>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-list-item>
            <v-list-item-content>
              KR1 100% global role users for tagging and for services are happy as measured by the
              happy scale.
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              KR2 100% market role users for tagging and for services are happy as measured by the
              happy scale.
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              KR3 Establish the Error budget agreed.
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'OKR',
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>

<style scoped></style>
