# Ollert

Mini Trello clone for learning purposes and is not complete using:

- .NET Core - For the API
- React using Typescript - For the web client
- Redux - Managing state of the board, columns, tasks etc. React hooks for component states

##### :warning: This project was for learning purposes only and is only intended to be run in a development environment

# Demo

![Ollert](https://media.giphy.com/media/JXYW8WgyG6t7Q9bBoR/giphy.gif)

# To be done

- Roles and resource authorization
- Flatten redux state
- Add users to board
- Assign users to tasks
- Board templates

## Run it locally

Database
`docker-compose dev.docker-compose.yml up`

API
`cd OllertServer/OllertServer.WebApi `
`dotnet watch run`

Client
`cd OllertClient`
`npm start`
