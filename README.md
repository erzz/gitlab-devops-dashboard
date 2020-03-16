# gitlab-dash

## Known issues

* Menu bar doesnt align nicely with top left at the moment
* Sidemenu and footer and just dumped in App.vue instead of component includes
* No solution with purely client-side application is going to protect the API key - need to add NUXT or similar
* Progress indicator needed for DevOps view as it can take 10-20 secs to fetch the data and update the view
* Would like to add monthly sparklines for the devops stats
* Need a global view rather than project by project (challenging given the number of API calls)
* Only running locally ready - working on a docker image with Nginx proxying API requests to gitlab (may not be required with NUXT)

## Project setup
```
npm install
```

Create an access token at https://gitlab.com/profile/personal_access_tokens with the api permission.

Take the token and add it to a .env.local file along with the RPIM Group ID at Gitlab

```
VUE_APP_GL_GROUPID=5897639
VUE_APP_GL_TOKEN=myPersonalACcessTok3n
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Datasources
* Gitlab API - Repo stats, deployment stats, failure rates, lead-time (possibly combined with Jira)
* Prometheus - Error rates, MTTD / MTTR (To be done)
* Jira - possibly lead-time but hopefully not required. (To be Done)

## Useful Commands in dev / testing
Get a list of all projects for a group
```
curl --header "Private-Token: $GL_TOKEN" "https://gitlab.com/api/v4/groups/$GL_GROUPID/projects" | jq . > /Users/ersw/OneDrive/Sites/gitlab.com/sean-personal/gitlab-dash/src/data/projectlist-dummy.json
```