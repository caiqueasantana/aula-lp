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

- **Controller**: Expõe os endpoints REST e repassa as operações para a Service.
- **Service**: Centraliza as regras de negócio, validações e tratamento de erros.
- **Repository**: Interface que estende JpaRepository, com persistência nativa.
- **Entity**: Define atributos do produto, como id, nomeProduto e preco.

---

## 4. Modelagem e Estrutura do Banco de Dados

A entidade Produto originou automaticamente a tabela `produto` no PostgreSQL, composta por:
- `id` (SERIAL / Integer, PRIMARY KEY)
- `nomeProduto` (VARCHAR, UNIQUE)
- `preco` (NUMERIC)
  
A configuração do banco está em `application.properties`.

---

## 5. Implementação do CRUD

- **Create (POST `/produto`)**: Recebe dados via JSON, utiliza `saveAndFlush` para persistência imediata.
- **Read (GET `/produto?id=XX`)**: Busca produto pelo ID, lança exceção se não encontrado.
- **Update (PUT `/produto?id=XX`)**: Atualização parcial, lógica de merge de campos.
- **Delete (DELETE `/produto?id=XX`)**: Remove o produto pelo ID diretamente.

---

## 6. Funcionamento da Aplicação

O fluxo é: requisição HTTP → Controller → Service → Repository (JPA) → Banco de dados.  
A aplicação roda na porta 8081 (`server.port = 8081`).

---

## 7. Boas Práticas Aplicadas

- Injeção de dependência pelo construtor
- Separação clara de camadas
- Uso de BigDecimal para valores monetários
- Uso de Lombok para redução de código
- Validação e tratamento de erros explícitos
- Persistência imediata com `saveAndFlush`
- Atualização inteligente via padrão Builder

---

## 8. Conclusão

O sistema cumpre integralmente os requisitos de um CRUD funcional e estruturado, pronto para evoluir com novas funcionalidades. O uso de Spring Boot e JPA simplificou tanto o desenvolvimento quanto a manutenção, e o projeto demonstra domínio em conceitos essenciais de desenvolvimento web com Java.

---
