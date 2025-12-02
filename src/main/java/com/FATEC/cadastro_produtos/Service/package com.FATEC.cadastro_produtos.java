package com.FATEC.cadastro_produtos.presentation.exception;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * DTO padrão para respostas de erro.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

    private LocalDateTime timestamp;
    private int status;
    private String mensagem;
    private Map<String, String> erros;
}
