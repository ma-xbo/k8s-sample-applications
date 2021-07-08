# Beispielanwendungen zum Testen von Kubernetes

## Installation des k3s Cluster

1. Erstellen einer Virtuellen Maschine mit Ubuntu Server 18.4
2. Konfigurieren des Netzwerkinterface (VM benötigt Internetzugang)
3. Installieren von k3s
   ```shell
   curl -sfL https://get.k3s.io | sh -
   ```
4. Prüfen, ob die Installation erfolgreich durchlaufen wurde
   ```shell
   sudo kubectl get node
   ```

## Manuelles Deployen der Container

```shell
docker build -t ghcr.io/ma-xbo/basic-python-webserver:latest .\basic-python-webserver\
docker login ghcr.io --username github-account
docker push ghcr.io/ma-xbo/basic-python-webserver:latest
```

## Manuelles Apply der Container
Mit dem Befehl `sudo kubectl apply -f https://raw.githubusercontent.com/ma-xbo/k8s-sample-applications/main/k8s/basic-python-webserver.yaml` wird beispielsweise das Deployment sowie der Service der basic-python-webserver Anwendung auf das Kubernetes Cluster angewendet.

```shell
cloudy@k3s-test:~$ sudo kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.43.0.1    <none>        443/TCP   24h


cloudy@k3s-test:~$ sudo kubectl apply -f https://raw.githubusercontent.com/ma-xbo/k8s-sample-applications/main/k8s/basic-python-webserver.yaml
deployment.apps/basic-python-webserver-deployment created
service/basic-python-webserver-service created


cloudy@k3s-test:~$ sudo kubectl get all
NAME                                                    READY   STATUS    RESTARTS   AGE
pod/basic-python-webserver-deployment-dff58f5db-pxfbw   1/1     Running   0          44s

NAME                                     TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/kubernetes                       ClusterIP   10.43.0.1       <none>        443/TCP    25h
service/basic-python-webserver-service   ClusterIP   10.43.116.216   <none>        5000/TCP   44s

NAME                                                READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/basic-python-webserver-deployment   1/1     1            1           44s

NAME                                                          DESIRED   CURRENT   READY   AGE
replicaset.apps/basic-python-webserver-deployment-dff58f5db   1         1         1       44s
```

Sobald das Deployment und der Service der Anwendung gestartet sind, können Anfragen an den Webserver gestellt werden.
Dazu kann der Befehl `curl` genutzt werden. 
Hinweis: Die Addresse des Endpoint erhält man über `kubectl describe service/basic-python-webserver-service`

```shell
cloudy@k3s-test:~$ sudo kubectl describe service/basic-python-webserver-service
[sudo] password for cloudy: 
Name:              basic-python-webserver-service
Namespace:         default
Labels:            <none>
Annotations:       <none>
Selector:          app=basic-python-webserver
Type:              ClusterIP
IP Family Policy:  SingleStack
IP Families:       IPv4
IP:                10.43.116.216
IPs:               10.43.116.216
Port:              basic-python-webserver  5000/TCP
TargetPort:        5000/TCP
Endpoints:         10.42.0.16:5000
Session Affinity:  None
Events:            <none>


cloudy@k3s-test:~$ curl 10.42.0.16:5000
Hello, Docker!
```

