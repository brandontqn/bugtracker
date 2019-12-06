#~/bin/bash
docker build . -t brandontqnguyen/project-tracker_user-management-service --no-cache
docker push brandontqnguyen/project-tracker_user-management-service
kubectl delete svc user-management-service
kubectl delete deploy user-management-service
kubectl apply -f service.yml
