# Biblioteca Web - estrutura inicial

Projeto de base para começar o trabalho em dupla.

- Backend: Java 17, Spring Boot 3.2, Maven
- Frontend: React 18, React Router 6 e Axios
- Banco: PostgreSQL 15
- CI: GitHub Actions
- Containers: Docker Compose

Nesta versão, as telas são apenas estruturas iniciais. Os cadastros de autores e livros serão adicionados nas branches `feature/autores` e `feature/livros`.

Para rodar com Docker: `docker compose up -d --build`.

Para rodar separadamente: `cd backend && mvn spring-boot:run` e, em outro terminal, `cd frontend && npm install && npm start`.
