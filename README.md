gcloud container clusters get-credentials tofatofa --zone asia-east1-a --project tofatofa-208515

kubectl proxy --port=800

kubectl get --namespace=kube-system secret

kubectl --namespace=kube-system describe secret deployment-controller-token-l2j4v

kubectl create -f F:\Yogesh\Yogesh\asch\littlebit\serviceaccounts\serviceaccounts\studio-admin\serviceaccount.yaml

kubectl create -f F:\Yogesh\Yogesh\asch\littlebit\serviceaccounts\serviceaccounts\studio-admin\rolebinding.yaml

kubectl --namespace=default describe secret tofa-admin-token-lj6q8

```javascript
token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InRvZmEtYWRtaW4tdG9rZW4tbGo2cTgiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoidG9mYS1hZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImIxYWVlZTQxLTdhMzItMTFlOC04Y2E3LTQyMDEwYThjMGZkYiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OnRvZmEtYWRtaW4ifQ.ZhXhmhgpWJQOTAecqzdiCJxybe4T2Loy_kNTyzFrU49zdBNtb9ZFOPfZMSCHebkPGxPighQ7aZ4Fk_HUgSmNz2hHJC5iKthXdIVkHspxhNqGO3TEsOpYCxYnAR-8DUfmTw48JBOPSSEu21FYfY1Csxp1JaEn1gWoMtMSSqPn6bvCzX27-zgPeFsCQsgTlal19FE0XcWHptrjHcmxPQKfwqs_JNAgLIg0MYv2ogmYMCSVASZv0GtlAqBdJ7r1e7VUr1ZSstk2F0-FMuJ4MIYIv7fqRzGh8PZXinWzwneJ2cJeQMitNODWt26-o-TLIvmorCs5RYThDaNPHIXbZKa_bg";
```

kubectl create secret --namespace=default generic couchdb-credential --from-literal=couchdb.username=admin --from-literal=couchdb.password=56KWgAUd7BukAbm4

kubectl --namespace=default port-forward couchdb-0 5985:5984

kubectl --namespace=default exec -it tofa-ui-0 /bin/sh

docker build -t shop_api -f ./Dockerfile.api .

docker tag shop_api ymandaokar/tofa:0.0.2

docker push ymandaokar/tofa:0.0.2

docker build -t shop_ui -f ./Dockerfile.ui .

docker tag shop_ui ymandaokar/tofa-ui:0.0.2

docker push ymandaokar/tofa-ui:0.0.2
