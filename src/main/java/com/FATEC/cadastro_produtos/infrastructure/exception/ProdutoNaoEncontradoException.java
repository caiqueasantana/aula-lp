package com.FATEC.cadastro_produtos.infrastructure.exception;

public class ProdutoNaoEncontradoException extends RuntimeException {
    public ProdutoNaoEncontradoException(String message) {
        super(message);
    }

    public ProdutoNaoEncontradoException(String message, Throwable cause) {
        super(message, cause);
    }
}
