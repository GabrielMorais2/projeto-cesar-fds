# Cesar School - Fundamentos em Desenvolvimento de Software

Esta aplicação web, desenvolvida com Java Spring Boot e React, visa otimizar o processo de avaliação 360 de projetos acadêmicos, que atualmente é feito por meio de formulários, tornando-o mais intuitivo e acessível para professores e alunos. A plataforma permitirá que professores gerenciem grupos e disciplinas e que alunos avaliem seus colegas de grupo em diversos critérios, como pensamento crítico, colaboração e qualidade das entregas. Além disso, o sistema automatizará o cálculo das médias de avaliação, enviará notificações, e garantirá a segurança e integridade dos dados, utilizando o FaCT (Fator de Contribuição Técnica) para ajustar as notas individuais de acordo com a contribuição de cada aluno.

## JIRA

- Board com backlog e items para sprint

![image](https://github.com/user-attachments/assets/cf116476-8061-4169-8efd-fd6efa7b9975)

## Protótipos

- Cadastro - Jira e Figma

![image](https://github.com/user-attachments/assets/01f97c5f-6996-47f5-b52a-4a1cf9d96c77)
![image](https://github.com/user-attachments/assets/7880301e-22b3-4b13-964c-3b96fa3187c2)

- Login - Jira e Figma

![image](https://github.com/user-attachments/assets/ee05d528-9edb-460b-9663-978ff5036e4e)
![image](https://github.com/user-attachments/assets/ade88c24-4e82-4ec2-a2d2-8a56fae52f22)

- Criação e Gerenciamento de Disciplinas - Jira e Figma

![image](https://github.com/user-attachments/assets/9cb462fb-087a-440e-84c4-ad2feff2da3b)
![image](https://github.com/user-attachments/assets/c087eb5e-0dbd-443a-a3b0-70830cab6fa5)

- Criação e Gerenciamento de Grupos - Jira e Figma

![image](https://github.com/user-attachments/assets/466b8aa9-9c00-4248-a14b-c7d1ad4473a7)
![image](https://github.com/user-attachments/assets/fc77ff81-035b-4cd3-a755-ee27c8e0273b)

- Acesso ao Dashboard - Jira e Figma

![image](https://github.com/user-attachments/assets/ce71078f-01c2-44a4-aa47-243499c71f8d)
![image](https://github.com/user-attachments/assets/9df3b441-596b-48b5-a5d0-42d50c7c9053)

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

![image](https://github.com/user-attachments/assets/c4bef6c1-07ac-4818-8718-68218f578fd0)
