# DevOps Dashboard

## Known issues

* Menu bar doesnt align nicely with top left at the moment
* Would like to add monthly sparklines for the devops stats
* Need a global view rather than project by project (challenging given the number of API calls)

## Project setup

Create an access token at https://gitlab.com/profile/personal_access_tokens with the api permission.

Take the token and add it to a .env file

```
GITLAB_API_KEY=myPersonalACcessTok3n
```

Verify that the `GITLAB_GROUPID` set in nuxt.config.js is correct for your team's Gitlab group. You can verify the group id by going to https://gitlab.com/your-group and it is directly below the group name on that page
```javascript
env: {
    GITLAB_GROUPID: 5897639
  },
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
