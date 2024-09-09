# Cesar School - Fundamentos em Desenvolvimento de Software

Esta aplicação web, desenvolvida com Java Spring Boot e React, visa otimizar o processo de avaliação 360 de projetos acadêmicos, que atualmente é feito por meio de formulários, tornando-o mais intuitivo e acessível para professores e alunos. A plataforma permitirá que professores gerenciem grupos e disciplinas e que alunos avaliem seus colegas de grupo em diversos critérios, como pensamento crítico, colaboração e qualidade das entregas. Além disso, o sistema automatizará o cálculo das médias de avaliação, enviará notificações, e garantirá a segurança e integridade dos dados, utilizando o FaCT (Fator de Contribuição Técnica) para ajustar as notas individuais de acordo com a contribuição de cada aluno.

### Tecnologias

- JDK 17
- Spring Boot with Maven
- Swagger
- PostgreSQL
- React
- Shadcn
- Vite
- TypeScript
- Docker e Docker compose

## Requerimentos

Para instalar a aplicação, algumas tecnologias são requeridas como:

- Java 17
- Docker e Docker Compose
- Nodejs 18^

## Instalação

### Para instalar o backend, siga esses passos:

- Clone o repositorio do GitHub:

```shel
  git clone https://github.com/GabrielMorais2/projeto-cesar-fds.git
```

- Execute o docker para iniciar o banco de dados:

```shel
  docker-compose up
```

- Navegue até o diretorio backend da aplicação:

```shel
  cd projeto-cesar-fd | cd backend
```

- Execute o maven para iniciar a aplicação:

```shel
  mvn clean install
  mvn spring-boot:run
```

### Feito isso, o backend irá subir agora é a vez do frontend

- Navegue até o diretorio backend da aplicação:

```shel
  cd projeto-cesar-fd | cd frontend
```

- Instale as dependências e inicie o servidor de desenvolvimento:
  
```shel
  npm install
  npm run dev
```

Feito isso, irá subir o frontend e backend. A aplicação ficará disponivel em  http://localhost:5173/login

![image](https://github.com/user-attachments/assets/c4bef6c1-07ac-4818-8718-68218f578fd0) 👍
