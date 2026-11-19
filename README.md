# Biblioteca Web

Sistema web desenvolvido para cadastro e gerenciamento de autores e livros, como atividade da disciplina de Engenharia de Software.

O sistema permite cadastrar, listar, consultar, editar e excluir autores e livros. Cada livro está vinculado a um autor, e um autor pode possuir vários livros.

## Tecnologias utilizadas

- **Backend:** Java 17, Spring Boot 3.2 e Maven
- **Frontend:** React 18, React Router 6 e Axios
- **Banco de dados:** PostgreSQL 15
- **Testes:** JUnit 5, Mockito e H2
- **Versionamento:** Git e GitHub
- **Integração contínua:** GitHub Actions
- **Containers:** Docker e Docker Compose

## Estrutura do projeto

- `backend/` — API REST, entidades, repositórios e testes
- `frontend/` — interface React e comunicação com a API
- `docker-compose.yml` — configuração dos containers
- `.github/workflows/ci-cd.yml` — pipeline de integração contínua

## Funcionalidades

**Autores**
- Cadastrar autores
- Listar autores em ordem alfabética
- Consultar autor por ID
- Editar autores
- Excluir autores

**Livros**
- Cadastrar livros vinculados a autores
- Listar livros e seus respectivos autores
- Consultar livro por ID
- Editar livros
- Excluir livros

## Como executar

É necessário ter o Docker Desktop instalado e em execução.

Na pasta principal do projeto, execute:

`docker compose up -d --build`

Depois acesse:

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

Para encerrar os containers:

`docker compose down`

## Testes

Para executar os testes do backend, entre na pasta `backend` e utilize:

`mvn test`

Também é possível executar os testes com Docker, sem instalar o Maven localmente.

Os testes verificam o funcionamento dos controllers e a integração entre autores e livros.

## Endpoints da API

| Método | Endpoint | Funcionalidade |
|---|---|---|
| GET | /api/autores | Listar autores |
| POST | /api/autores | Cadastrar autor |
| GET | /api/autores/{id} | Consultar autor |
| PUT | /api/autores/{id} | Atualizar autor |
| DELETE | /api/autores/{id} | Excluir autor |
| GET | /api/livros | Listar livros |
| POST | /api/livros | Cadastrar livro |
| GET | /api/livros/{id} | Consultar livro |
| PUT | /api/livros/{id} | Atualizar livro |
| DELETE | /api/livros/{id} | Excluir livro |

## Organização do desenvolvimento



- **DEV 1 – Felipe Carvalho de Paula Silva:** implementação dotrabalho completo `feature/autores`.


As alterações foram organizadas em commits e integradas à branch `main` por meio de Pull Requests.

## Integração contínua

O projeto possui um workflow do GitHub Actions configurado para executar os testes do backend e verificar o frontend automaticamente.
