#~/bin/bash
docker build . -t brandontqnguyen/project-tracker_token-generation-service --no-cache
docker push brandontqnguyen/project-tracker_token-generation-service
kubectl delete svc token-generation-service
kubectl delete deploy token-generation-service
kubectl apply -f service.yml
