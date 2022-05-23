<br />
<div align="center">

  <h3 align="center">:sparkles:Sistemas Distribuidos: Tarea 02:sparkles:</h3>

  <p align="center">
    :sparkles:Lucas Almonacid y Benjamín Fernández:sparkles:
  </p>
</div>

## :boom: Descripción

En este presente repositorio se almacena la tarea 2 de sistemas distribuidos y se explica la instalacion junto con informacion necesaria para entender el sistema implementado.

### 🛠 Construído con:


* [Node.js](https://nodejs.org/es/)
* [Apache Kafka](https://kafka.apache.org)
* [Redis](https://redis.io)
* [Docker](https://www.docker.com)

## :shipit: Instalación

En primer lugar, se debe de tener claros los pre-requisitos, estas son:

### Pre-Requisitos

Tener Docker y Docker Compose instalado
* [Installation Guide](https://docs.docker.com/compose/install/)

### Primeros pasos

Después de haber descargado los archivos del git (usar técnica que más le acomode), se debe de ubicar en la terminal de su SO en la carpeta correspondiente a la aplicación y aplicar el comando:
```curl
docker-compose up
```
Al iniciar la aplicación se podrá acceder al apartado login en localhost:8080, en este se realizaran los post via un json de "user" y "pass". Al ingresar 5 veces seguidas en menos de un minuto el usuario quedara ingresado al apartado bloqueado, este se encuentra en localhost:8070 y se pueden conseguir todos los usuarios bloqueados por medio de un get.

* Post

```curl
localhost:8080/login
```
![image](https://user-images.githubusercontent.com/90724923/169911467-48ead155-f71d-47a8-90df-fc24fa6d9d02.png)

* Get

```curl
localhost:8070/blocked
```
![image](https://user-images.githubusercontent.com/90724923/169911550-da9af489-4923-4e8e-8271-e855808bf440.png)

Al realizar el post y el get se deberian de obtener los siguientes mensajes en consola si es que solo se ha realizado una vez cada uno:
![image](https://user-images.githubusercontent.com/90724923/169911864-d9fffd6c-6305-45da-82d0-a00d3d97bfe2.png)

Cabe decir que el almacenamiento de los datos es en REDIS, logrando asi que los usarios bloqueados queden almacenados en una base de datos noSQL.

# Analisis

* ¿Por qué Kafka funciona bien en este escenario? 
* Teniendo a disposicion Kafka y el backend utilizado ¿Que se podria hacer para manejar una gran cantidad de usuarios al mismo tiempo?


