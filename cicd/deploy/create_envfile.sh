#!/bin/sh
echo "Create secret..."

echo "Adding GROUPID to .env file"
echo "GITLAB_GROUPID=5897639" >> /tmp/.env
echo "Adding API key to .env file"
echo "GITLAB_API_KEY=$MR_TOKEN" >> /tmp/.env

# Create .env Secret
kubectl  -n "$KUBE_NAMESPACE" create secret generic devops-dash-env-file \
  --from-file /tmp/.env \
  -o yaml --dry-run | kubectl replace -n "$KUBE_NAMESPACE" --force -f - && rm -f /tmp/.env
