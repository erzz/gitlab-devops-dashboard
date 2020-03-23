# DevOps Dashboard

## Known issues

* Menu bar doesnt align nicely with top left at the moment
* Need to work on not exposing the API Key client-side
* Would like to add monthly sparklines for the devops stats
* Need a global view rather than project by project (challenging given the number of API calls)
* Only running locally ready - working on a docker image with Nginx proxying API requests to gitlab (may not be required with NUXT)

## Project setup

Create an access token at https://gitlab.com/profile/personal_access_tokens with the api permission.

Take the token and add it to a .env.local file along with the RPIM Group ID at Gitlab

```
VUE_APP_GL_GROUPID=5897639
VUE_APP_GL_TOKEN=myPersonalACcessTok3n
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
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
