<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NightOwl - authApi

Authentication API microservice designed specifically for the NightOwl application, built using the [Nest](https://github.com/nestjs/nest) framework. 

This microservice handles authentication and user related services.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`PORT`
`JWT_ACCESS_SECRET`
`JWT_REFRESH_SECRET`
`POSTGRES_HOST`
`POSTGRES_PORT`
`POSTGRES_USER`
`POSTGRES_PASSWORD`
`POSTGRES_DB`

You may use .env.example as a template.

## Installation

- Create a .env file in the root directory of the project. 
- Use the provided .env.example file as a template and configure the necessary options in the .env file.
- Make sure you have Docker and Docker Compose installed on your machine.

## Usage

To run the microservice, follow these steps:

- Ensure that you have properly configured the environment variables as mentioned in the previous sections.
- Open a terminal or command prompt.
- Navigate to the project directory.
- Run the following command:

```
docker compose up
```

## Configuring Postman

To easily set up the API endpoints and requests in Postman, you can make use of the `postman_collection.json` file. 

This file contains a collection of API requests and associated configurations. Follow the steps below to configure Postman with the provided collection:

- Open Postman and click on the "Import" button in the top left corner.
- In the import window, select the "Upload Files" tab.
- Click on "Choose Files" and select the `night-owl.authApi.postman_collection.json` file.
- Click on "Import" to import the collection into Postman.

Once imported, you will see the NightOwl API collection in your Postman workspace. You can explore the available endpoints, headers, and request bodies within the collection. This makes it easy to interact with the NightOwl - authApi microservice directly from Postman.
