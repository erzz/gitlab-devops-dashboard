<template>
  <!-- TO-DO
  * Code Committed - questionable value
  * MTTD - will utililse some prometheus metrics in a later version
  * MTTR - will utililse some prometheus metrics in a later version
  -->
  <v-container>
    <!-- DEBUG ZONE
    <div>
      {{ this.$store.state.deployments }}
    </div>
    <div>
      Month: {{ months[12] }}
    </div>
    -->
    <v-row>
      <v-col cols="12">
        <v-card color="secondary" dark>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Deployment Frequency</v-list-item-title>
              <v-list-item-subtitle>Fast iteration and continuous delivery are key measurements of
                DevOps success. </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <div>
      <v-progress-linear
        v-show="this.loading"
        indeterminate
        color="primary darken-2"
      ></v-progress-linear>
    </div>
    <v-row cols="12">
      <v-col v-for="month in months" v-bind:key="month">
        <v-card>
          <v-toolbar color="accent" dark>
            <v-toolbar-title>{{ month.month }}</v-toolbar-title>
          </v-toolbar>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <th>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        target="_blank"
                        v-on="on"
                      >
                        <v-icon>mdi-source-branch</v-icon>
                      </v-btn>
                    </template>
                    <span>Environment / Branch</span>
                  </v-tooltip></th>
                <th>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        target="_blank"
                        v-on="on"
                      >
                        <v-icon>mdi-truck-delivery-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Total Deployments</span>
                  </v-tooltip>
                </th>
                <th>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        target="_blank"
                        v-on="on"
                      >
                        <v-icon>mdi-calendar-today</v-icon>
                      </v-btn>
                    </template>
                    <span>Avg Deploys per Day</span>
                  </v-tooltip>
                </th>
                <th>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        target="_blank"
                        v-on="on"
                      >
                        <v-icon>mdi-percent-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Success rate</span>
                  </v-tooltip>
                </th>
                <th>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        target="_blank"
                        v-on="on"
                      >
                        <v-icon>mdi-timer-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Avg Pipeline Duration</span>
                  </v-tooltip>
                </th>
              </thead>
              <tbody>
                <tr class="prodRow">
                  <td>Production</td>
                  <td
                    :class="month.deployments.prodAvgDay >= 0.1 ? 'good'
                    : month.deployments.prodAvgDay > 0 ? 'ok' :
                     'bad'">
                     {{ month.deployments.prodDeploys }}
                  </td>
                  <td
                    :class="month.deployments.prodAvgDay >= 0.1 ? 'good'
                    : month.deployments.prodAvgDay > 0 ? 'ok' :
                     'bad'">
                      {{ month.deployments.prodAvgDay }}
                  </td>
                  <td
                    :class="month.deployments.prodSuccRate > 90 ? 'good'
                    : month.deployments.prodSuccRate > 80 ? 'ok' :
                     'bad'">
                     {{ month.deployments.prodSuccRate }}
                  </td>
                  <td>
                    {{ month.deployments.prodAvgPipeTime }}
                  </td>
                </tr>
                <tr class="nonProdRow">
                  <td>Staging</td>
                  <td
                    :class="month.deployments.stagAvgDay >= 0.2 ? 'good'
                    : month.deployments.stagAvgDay > 0 ? 'ok' :
                     'bad'">
                     {{ month.deployments.stagDeploys }}
                  </td>
                  <td
                    :class="month.deployments.stagAvgDay >= 0.2 ? 'good'
                    : month.deployments.stagAvgDay > 0 ? 'ok' :
                     'bad'">
                      {{ month.deployments.stagAvgDay }}
                  </td>
                  <td
                    :class="month.deployments.stagSuccRate > 80 ? 'good'
                    : month.deployments.stagSuccRate > 70 ? 'ok' :
                     'bad'">
                     {{ month.deployments.stagSuccRate }}
                  </td>
                  <td>
                    {{ month.deployments.stagAvgPipeTime }}
                  </td>
                </tr>
                <tr class="nonProdRow">
                  <td>Feature</td>
                  <td
                    :class="month.deployments.featAvgDay >= 0.4 ? 'good'
                    : month.deployments.featAvgDay > 0 ? 'ok' :
                     'bad'">
                     {{ month.deployments.featDeploys }}
                  </td>
                  <td
                    :class="month.deployments.featAvgDay >= 0.4 ? 'good'
                    : month.deployments.featAvgDay > 0 ? 'ok' :
                     'bad'">
                      {{ month.deployments.featAvgDay }}
                  </td>
                  <td
                    :class="month.deployments.featSuccRate > 70 ? 'good'
                    : month.deployments.featSuccRate > 60 ? 'ok' :
                     'bad'">
                     {{ month.deployments.featSuccRate }}
                  </td>
                  <td>
                    {{ month.deployments.featAvgPipeTime }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
</v-container>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DevOps',
  created() {
    if (this.$store.state.deployments.length < 1) {
      this.$store.dispatch('getDeployments', this.id);
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    deployments() {
      return this.$store.state.deployments;
    },
    months() {
      const monthTs = [];
      const stats = [];
      for (let i = 0; i <= 12; i += 1) {
        const endCurrentMonth = moment().endOf('month');
        const m = endCurrentMonth.subtract(i, 'month').format();
        monthTs.push(m);
      }
      // console.log(monthTs); // DEBUG
      for (let i = 0; i < monthTs.length - 1; i += 1) {
        const month = moment(monthTs[i]).format('YYYY-MMMM');
        // console.log(month, 'Start=', monthTs[i + 1], 'end=', monthTs[i]); // DEBUG
        stats.push({
          month,
          startTime: monthTs[i],
          endTime: monthTs[i + 1],
          deployments: this.deployStatsByTimeWindow(monthTs[i + 1], monthTs[i]),
        });
      }
      return stats;
    },
  },
  methods: {
    filterByTime(start, end) {
      const result = this.deployments.filter(
        (deploy) => deploy.updated_at > start && deploy.updated_at < end,
      );
      return result;
    },
    deployStatsByTimeWindow(start, end) {
      const inData = this.deployments.filter(
        (deploy) => deploy.updated_at > start && deploy.updated_at < end,
      );
      let pipeTime = 0;
      const pipeReducer = (accumulator, item) => accumulator + item.pipe_duration;
      const monthlyStats = {
        daysInMonth: (moment(end).daysInMonth()),
        totalDeploys: inData.length,
        prodDeploys: inData.filter((item) => item.environment === 'production').length,
        stagDeploys: inData.filter((item) => item.environment === 'staging').length,
        featDeploys: inData.filter((item) => item.environment === 'feature').length,
        prodSuccess: inData.filter((item) => item.environment === 'production' && item.status === 'success').length,
        stagSuccess: inData.filter((item) => item.environment === 'staging' && item.status === 'success').length,
        featSuccess: inData.filter((item) => item.environment === 'feature' && item.status === 'success').length,
        get prodAvgDay() { return (this.prodDeploys / this.daysInMonth).toFixed(2); },
        get stagAvgDay() { return (this.stagDeploys / this.daysInMonth).toFixed(2); },
        get featAvgDay() { return (this.featDeploys / this.daysInMonth).toFixed(2); },
        get prodSuccRate() { return ((this.prodSuccess / this.prodDeploys) * 100).toFixed(2); },
        get stagSuccRate() { return ((this.stagSuccess / this.stagDeploys) * 100).toFixed(2); },
        get featSuccRate() { return ((this.featSuccess / this.featDeploys) * 100).toFixed(2); },
        // for pipeline times - exclude failed and those lasting longer than an hour
        //  as they likely never completed which heavily skews results
        get prodAvgPipeTime() { pipeTime = 0; return ((inData.filter((item) => item.environment === 'production' && item.status === 'success' && item.pipe_duration < 3600000).reduce(pipeReducer, pipeTime) / 1000) / this.prodSuccess).toFixed(2); },
        get stagAvgPipeTime() { pipeTime = 0; return ((inData.filter((item) => item.environment === 'staging' && item.status === 'success' && item.pipe_duration < 3600000).reduce(pipeReducer, pipeTime) / 1000) / this.stagSuccess).toFixed(2); },
        get featAvgPipeTime() { pipeTime = 0; return ((inData.filter((item) => item.environment === 'feature' && item.status === 'success' && item.pipe_duration < 3600000).reduce(pipeReducer, pipeTime) / 1000) / this.featSuccess).toFixed(2); },
      };
      return monthlyStats;
    },
  },
};
</script>

<style scoped>
.good {
  color: #1aaa55;
}

.ok {
  color: #fc9403;
}

.bad {
  color: #db3b21;
}

.prodRow {
  font-weight: bold;
  border: solid;
}

.nonProdRow {
  color: grey;
}
</style>
