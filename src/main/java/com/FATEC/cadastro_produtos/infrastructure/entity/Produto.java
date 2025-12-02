package com.FATEC.cadastro_produtos.infrastructure.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidade que representa um Produto no sistema.
 * Mapeada para a tabela 'produto' no banco de dados.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "produto", uniqueConstraints = @UniqueConstraint(columnNames = "nome_produto"))
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "ID único do produto")
    private Integer id;

    @Column(name = "nome_produto", nullable = false, length = 100)
    @NotBlank(message = "Nome do produto não pode ser vazio")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    @Schema(description = "Nome único do produto", example = "Notebook Dell")
    private String nomeProduto;

    @Column(name = "preco", nullable = false)
    @NotNull(message = "Preço não pode ser nulo")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero")
    @Schema(description = "Preço do produto", example = "2499.99")
    private BigDecimal preco;

    @Column(name = "descricao", length = 500)
    @Size(max = 500, message = "Descrição não pode exceder 500 caracteres")
    @Schema(description = "Descrição detalhada do produto", nullable = true)
    private String descricao;

    @Column(name = "data_criacao", nullable = false, updatable = false)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime dataCriacao;

    @Column(name = "data_atualizacao")
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime dataAtualizacao;

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
        dataAtualizacao = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        dataAtualizacao = LocalDateTime.now();
    }
}
