#~/bin/bash
docker build . -t brandontqnguyen/project-tracker_project-management-service --no-cache
docker push brandontqnguyen/project-tracker_project-management-service
kubectl delete svc project-management-service
kubectl delete deploy project-management-service
kubectl apply -f service.yml
