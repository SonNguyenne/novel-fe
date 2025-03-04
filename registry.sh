#!/bin/bash

# Usage:
# chmod +x registry.sh
# ./registry.sh prod (or dev)

ENV=${1:-env}

# Check if the environment argument is valid
if [[ "$ENV" != "prod" && "$ENV" != "dev" ]]; then
  echo "Invalid environment. Please specify 'prod' or 'dev'."
  exit 1
fi

echo "Building with environment: $ENV"

# Build the web service using the environment specified
ENV=$ENV docker compose build --build-arg ENV=$ENV web

# Check if build was successful before pushing
if [[ $? -ne 0 ]]; then
  echo "Build failed. Aborting push."
  exit 1
fi

echo "Pushing image: developersota/frontend:$ENV"

# Push the image to the registry
ENV=$ENV docker compose push web

# Final success message
echo "Production build and push completed successfully!"
