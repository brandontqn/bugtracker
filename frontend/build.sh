#~/bin/bash
docker build . -t brandontqnguyen/project-tracker_project-management-frontend
docker push brandontqnguyen/project-tracker_project-management-frontend
kubectl delete svc project-management-frontend
kubectl delete deploy project-management-frontend
kubectl apply -f service.yml
