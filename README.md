# Microservices NodeJS

A nodeJS app for practicing microservices. This app contains 2 services- post and auth. They are sharing the resources while being decoupled from each other. Auth service uses MongoDB whereas Post uses Postgres running on a Docker container.

To run the app:

- set up the .env files which contain the JWT Secret, DB Connection String and PORT number.
- run `npm run serve`
