const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoriesIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoriesIndex < 0) {
    return response.status(400).json({ message: "Repository not find" });
  }

  const likes = repositories[repositoriesIndex].likes;

  const repository = {
    id, 
    url,
    title,
    techs,
    likes
  }

  repositories[repositoriesIndex] = repository;

  return response.json(repositories[repositoriesIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ message: "Repository not find."});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ message: "Repository not find."});
  }

  const countlikes = 1 + repositories[repositoryIndex].likes;

  repositories[repositoryIndex] = { ...repositories[repositoryIndex], likes: countlikes };

  return response.status(400).json(repositories[repositoryIndex]);
});

module.exports = app;
