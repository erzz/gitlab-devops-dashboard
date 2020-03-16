import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';

getData(url, options) {
  axios.get(url, options)
    .then((response) => {
      return response.data;
    });
}

getMonths() {
  const months = [];
  for (let i = 0; i <= 13; i += 1) {
    const endCurrentMonth = moment().endOf('month');
    const m = endCurrentMonth.subtract(i, 'month').format();
    months.push(m);
  }
  months.reverse();
  return months;
}

getDeployments() {
  const months = this.getMonths();
  for (let i = 0; i <= 12; i += 1) {
    const startDate = months[i];
    const endDate = months[(i + 1)];
    const monthName = moment(endDate).format('YYYY-MMMM');
    const url = `/api/v4/projects/${this.id}/deployments?order_by=created_at&sort=desc&per_page=1&updated_after=${startDate}&updated_before=${endDate}`;
    axios.head(url, {
      headers: {
        'Private-Token': token,
      },
    })
      .then((result) => console.log('Month:', monthName, ':', result.headers['x-total']));
  }
}

// Working code to dump all results to a single array
async getDeployments(projectId) {
  const results = [];
  const url = `/api/v4/projects/${projectId}/deployments`;
  let options = {
    headers: {
      'Private-Token': token,
    },
    params: {
      order_by: 'created_at',
      sort: 'desc',
      per_page: 100,
    },
  };
  // Use headers to get the number of pages
  const pages = await axios.head(url, options)
    .then((response) => response.headers['x-total-pages']);
  console.log('pages=', pages); // DEBUG
  // Loop through pages
  for (let i = 0; i <= pages; i += 1) {
    console.log('i=', i);
    options = {
      headers: {
        'Private-Token': token,
      },
      params: {
        order_by: 'created_at',
        sort: 'desc',
        per_page: 100,
        page: i,
      },
    };
    axios.get(url, options)
      .then(
        (result) => result.data.forEach((item) => {
          results.push({
            id: item.id,
            ref: item.ref,
            environment: item.environment.name,
            status: item.status,
            tag: item.deployable.tag,
            created_at: item.created_at,
            updated_at: item.updated_at,
          });
        }),
      );
  }
  console.log(results);
},