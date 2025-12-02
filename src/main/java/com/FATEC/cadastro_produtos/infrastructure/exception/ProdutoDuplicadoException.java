package com.FATEC.cadastro_produtos.infrastructure.exception;

public class ProdutoDuplicadoException extends RuntimeException {
    public ProdutoDuplicadoException(String message) {
        super(message);
    }

    public ProdutoDuplicadoException(String message, Throwable cause) {
        super(message, cause);
    }
}
