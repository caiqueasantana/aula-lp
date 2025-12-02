# FATEC CARAPICUÍBA

## Relatório Técnico: Desenvolvimento de um Sistema CRUD utilizando Spring Boot e PostgreSQL

### Integrantes

- Caique dos Anjos
- João Vitor Monteiro Correa
- Henrique Sousa Melo
- Pablo Araújo

---

### Carapicuíba - São Paulo  
2025


## 1. Introdução

Este relatório apresenta o desenvolvimento de um sistema CRUD (Create, Read, Update, Delete) para cadastro e gerenciamento de produtos, implementado como parte de um projeto acadêmico utilizando Java, Spring Boot e PostgreSQL. 

O objetivo foi construir uma aplicação web funcional, estruturada em camadas, com persistência de dados e endpoints REST.

#### 1.1 Contribuições Individuais

- **João**: Configuração inicial do projeto (Maven, dependências, properties) e desenvolvimento da camada Controller.
- **Pablo**: Modelagem da entidade Produto e integração com o banco de dados PostgreSQL.
- **Henrique**: Desenvolvimento da camada Service, implementação de regras de negócio, validações e tratamento de exceções.
- **Caique**: Desenvolvimento do Front-End para testes da API REST.

---

## 2. Tecnologias Utilizadas

- **Java 21**: Linguagem principal.
- **Spring Boot**: Framework para criar aplicações standalone.
- **Spring Web**: Exposição dos endpoints REST.
- **Spring Data JPA / Hibernate**: Persistência e ORM.
- **PostgreSQL**: Banco de dados relacional.
- **Maven**: Gerenciador de dependências e build.
- **Lombok**: Redução de boilerplate.

---

## 3. Arquitetura do Sistema

O projeto segue a arquitetura em camadas:

- **Controller** (`controller/`): Expõe os endpoints REST com documentação Swagger/OpenAPI e valida requisições.
- **Service** (`Service/`): Centraliza as regras de negócio, validações e tratamento de exceções customizadas.
- **DTO** (`presentation/dto/`): Define objetos de transferência de dados (ProdutoRequestDTO e ProdutoResponseDTO).
- **Entity** (`infrastructure/entity/`): Define a entidade Produto com atributos mapeados para o banco de dados.
- **Repository** (`infrastructure/repository/`): Interface que estende JpaRepository para operações de persistência.
- **Exception Handler** (`infrastructure/handler/`): Tratamento global de exceções e erros da API.

---

## 4. Modelagem e Estrutura do Banco de Dados

A entidade Produto é mapeada para a tabela `produtos` no PostgreSQL com as seguintes colunas:
- `id` (BIGSERIAL, PRIMARY KEY)
- `nome_produto` (VARCHAR(100), UNIQUE, NOT NULL)
- `preco` (DECIMAL(10, 2), NOT NULL)
- `descricao` (VARCHAR(500))
- `data_criacao` (TIMESTAMP WITH TIME ZONE, NOT NULL, AUTO-GENERATED)
- `data_atualizacao` (TIMESTAMP WITH TIME ZONE, AUTO-UPDATED)

A tabela possui:
- Índice em `nome_produto` para melhor performance nas buscas
- Row Level Security (RLS) habilitado com políticas públicas de leitura/escrita
- Trigger automático para atualizar `data_atualizacao`

A configuração do banco está em `application.properties`.

---

## 5. Implementação do CRUD

Todos os endpoints estão documentados com Swagger/OpenAPI em `/swagger-ui.html`.

- **Create (POST `/api/v1/produtos`)**: Recebe um ProdutoRequestDTO via JSON, valida duplicidade de nome e persiste o produto. Retorna status 201 com o ProdutoResponseDTO.
- **Read - Por ID (GET `/api/v1/produtos/{id}`)**: Busca produto pelo ID, lança `ProdutoNaoEncontradoException` se não encontrado.
- **Read - Por Nome (GET `/api/v1/produtos/nome/{nome}`)**: Busca produto pelo nome (case-insensitive).
- **Read - Listar com Paginação (GET `/api/v1/produtos?page=0&size=10`)**: Retorna produtos paginados.
- **Read - Listar Todos (GET `/api/v1/produtos/listar/todos`)**: Retorna todos os produtos sem paginação.
- **Update (PUT `/api/v1/produtos/{id}`)**: Atualiza um produto existente, validando duplicidade apenas se o nome for alterado.
- **Delete (DELETE `/api/v1/produtos/{id}`)**: Remove o produto pelo ID.

---

## 6. Funcionamento da Aplicação

O fluxo da requisição é:
```
Requisição HTTP → Controller → Service (com validações) → Repository (JPA) → PostgreSQL
```

Validações aplicadas:
- Nome do produto: obrigatório, 3-100 caracteres, único no banco
- Preço: obrigatório, mínimo 0.01
- Descrição: máximo 500 caracteres

Exceções customizadas:
- `ProdutoDuplicadoException`: Lançada quando o nome do produto já existe
- `ProdutoNaoEncontradoException`: Lançada quando o produto não é encontrado

A aplicação roda na porta **8081** (`server.port = 8081`).

### Documentação da API
- **Swagger UI**: http://localhost:8081/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8081/v3/api-docs

---

## 7. Boas Práticas Aplicadas

- **Injeção de dependência pelo construtor** via Lombok `@RequiredArgsConstructor`
- **Separação clara de camadas**: Controller → Service → Repository → Entity
- **DTOs** para transferência de dados entre camadas
- **Transações** com `@Transactional` para operações consistentes
- **Validações** com Jakarta Validation (`@NotBlank`, `@Size`, `@DecimalMin`)
- **Uso de BigDecimal** para valores monetários
- **Uso de Lombok** para redução de boilerplate (getters, setters, builders)
- **Tratamento de exceções customizadas** com GlobalExceptionHandler
- **Versionamento de API** em `/api/v1/`
- **Documentação automática** com Swagger/OpenAPI
- **CORS habilitado** para integração com frontends
- **Timestamps automáticos** com `@PrePersist` e `@PreUpdate`
- **Soft delete pattern** via triggers no banco de dados

---

## 8. Conclusão

O sistema cumpre integralmente os requisitos de um CRUD funcional e estruturado, pronto para evoluir com novas funcionalidades. O uso de Spring Boot e JPA simplificou tanto o desenvolvimento quanto a manutenção, e o projeto demonstra domínio em conceitos essenciais de desenvolvimento web com Java.

---
