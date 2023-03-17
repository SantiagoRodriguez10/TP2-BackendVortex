# BackendVortex

Esta Backend es un sistema de gestión de activos asignados a sus empleados

## Descripción

Está elaborado con tecnologías como [NodeJs], [ExpressJs], la base de datos elegida fue [MySQL]
y el gestor de la misma fue [DBeaver]

## Installation

bash
$ npm install

## Configuration

La aplicación es configurable a través de las siguientes variables de entorno:

#.env variables:

HOST=127.0.0.1
DATABASE=sakila
USER=root
PASSWORD=root123

Luego levantar la base de datos con el siguiente comando
$ npm run dev

### Postman

Este proyecto cuenta con una carpeta dentro de src llamada "postman" cuya carpeta contiene el file para importar en postman y así tener un manejo organizado y completo de los endpoints

Postman Collection:

Ver: [environtment-postman](./src/postman/Vortex_Backend.postman_collection.json)
