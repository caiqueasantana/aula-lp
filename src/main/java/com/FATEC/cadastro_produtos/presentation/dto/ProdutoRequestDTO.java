package com.FATEC.cadastro_produtos.presentation.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "DTO para requisição de produto")
public class ProdutoRequestDTO {

    @NotBlank(message = "Nome do produto é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    @Schema(description = "Nome único do produto", example = "Notebook Dell XPS 13")
    private String nomeProduto;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero")
    @Schema(description = "Preço do produto", example = "2499.99")
    private BigDecimal preco;

    @Size(max = 500, message = "Descrição não pode exceder 500 caracteres")
    @Schema(description = "Descrição detalhada do produto", example = "Notebook ultrafino com processador Intel Core i7")
    private String descricao;
}
