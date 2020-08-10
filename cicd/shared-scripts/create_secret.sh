#!/bin/sh
echo "Create secret..."
if [[ "$CI_PROJECT_VISIBILITY" == "public" ]]; then
    return
fi

kubectl create secret -n "$KUBE_NAMESPACE" \
    docker-registry gitlab-registry \
    --docker-server="$CI_REGISTRY" \
    --docker-username="${CI_DEPLOY_USER:-$CI_REGISTRY_USER}" \
    --docker-password="${CI_DEPLOY_PASSWORD:-$CI_REGISTRY_PASSWORD}" \
    --docker-email="$GITLAB_USER_EMAIL" \
    -o yaml --dry-run | kubectl replace -n "$KUBE_NAMESPACE" --force -f -

if [ -z $CI_COMMIT_TAG ]; then
  echo "Creating dev service account variables"
  echo "$DEV_ADMIN_SERVICE_ACCOUNT_SECRET" > /tmp/retail-pim-admin-sa.json
else
  echo "Creating prod service account variables"
  echo "$PROD_ADMIN_SERVICE_ACCOUNT_SECRET" > /tmp/retail-pim-admin-sa.json
fi

kubectl apply -f /tmp/secrets.yaml
rm -f /tmp/secrets.yaml
