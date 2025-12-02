package com.FATEC.cadastro_produtos.presentation.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "DTO para resposta de produto")
public class ProdutoResponseDTO {

    @Schema(description = "ID único do produto", example = "1")
    private Integer id;

    @Schema(description = "Nome do produto", example = "Notebook Dell XPS 13")
    private String nomeProduto;

    @Schema(description = "Preço do produto", example = "2499.99")
    private BigDecimal preco;

    @Schema(description = "Descrição do produto")
    private String descricao;

    @Schema(description = "Data de criação", example = "2024-12-02T10:30:00")
    private LocalDateTime dataCriacao;

    @Schema(description = "Data da última atualização", example = "2024-12-02T10:30:00")
    private LocalDateTime dataAtualizacao;
}
