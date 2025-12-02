package com.FATEC.cadastro_produtos.business;

import com.FATEC.cadastro_produtos.infrastructure.entity.Produto;
import com.FATEC.cadastro_produtos.infrastructure.exception.ProdutoNaoEncontradoException;
import com.FATEC.cadastro_produtos.infrastructure.exception.ProdutoDuplicadoException;
import com.FATEC.cadastro_produtos.infrastructure.repository.ProdutoRepository;
import com.FATEC.cadastro_produtos.presentation.dto.ProdutoRequestDTO;
import com.FATEC.cadastro_produtos.presentation.dto.ProdutoResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Serviço de negócio para Produto.
 * Contém toda a lógica de validação e manipulação de dados.
 */
@Service
@RequiredArgsConstructor
public class ProdutosService {

    private final ProdutoRepository repository;

    /**
     * Salva um novo produto no banco de dados.
     */
    @Transactional
    public ProdutoResponseDTO salvarProduto(ProdutoRequestDTO requestDTO) {
        validarNomeDuplicado(requestDTO.getNomeProduto());

        Produto produto = Produto.builder()
                .nomeProduto(requestDTO.getNomeProduto().trim())
                .preco(requestDTO.getPreco())
                .descricao(requestDTO.getDescricao() != null ? requestDTO.getDescricao().trim() : null)
                .build();

        Produto produtoSalvo = repository.save(produto);
        return converterParaResponseDTO(produtoSalvo);
    }

    /**
     * Busca um produto pelo ID.
     */
    @Transactional(readOnly = true)
    public ProdutoResponseDTO buscarPorId(Integer id) {
        validarId(id);
        Produto produto = repository.findById(id)
                .orElseThrow(() -> new ProdutoNaoEncontradoException(
                        String.format("Produto com ID %d não encontrado", id)
                ));
        return converterParaResponseDTO(produto);
    }

    /**
     * Busca um produto pelo nome.
     */
    @Transactional(readOnly = true)
    public ProdutoResponseDTO buscarPorNome(String nomeProduto) {
        validarStringVazia(nomeProduto, "Nome do produto");
        Produto produto = repository.findByNomeProdutoIgnoreCase(nomeProduto.trim())
                .orElseThrow(() -> new ProdutoNaoEncontradoException(
                        String.format("Produto '%s' não encontrado", nomeProduto)
                ));
        return converterParaResponseDTO(produto);
    }

    /**
     * Lista todos os produtos com paginação.
     */
    @Transactional(readOnly = true)
    public Page<ProdutoResponseDTO> listarTodos(Pageable pageable) {
        return repository.findAll(pageable).map(this::converterParaResponseDTO);
    }

    /**
     * Lista todos os produtos sem paginação.
     */
    @Transactional(readOnly = true)
    public List<ProdutoResponseDTO> listarTodosSemPaginacao() {
        return repository.findAll().stream()
                .map(this::converterParaResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Atualiza um produto existente.
     */
    @Transactional
    public ProdutoResponseDTO atualizarProduto(Integer id, ProdutoRequestDTO requestDTO) {
        validarId(id);
        Produto produtoExistente = repository.findById(id)
                .orElseThrow(() -> new ProdutoNaoEncontradoException(
                        String.format("Produto com ID %d não encontrado", id)
                ));

        // Validar nome duplicado apenas se estiver mudando o nome
        if (!produtoExistente.getNomeProduto().equals(requestDTO.getNomeProduto())) {
            validarNomeDuplicado(requestDTO.getNomeProduto());
        }

        produtoExistente.setNomeProduto(requestDTO.getNomeProduto().trim());
        produtoExistente.setPreco(requestDTO.getPreco());
        produtoExistente.setDescricao(requestDTO.getDescricao() != null ? requestDTO.getDescricao().trim() : null);

        Produto produtoAtualizado = repository.save(produtoExistente);
        return converterParaResponseDTO(produtoAtualizado);
    }

    /**
     * Deleta um produto pelo ID.
     */
    @Transactional
    public void deletarProduto(Integer id) {
        validarId(id);
        if (!repository.existsById(id)) {
            throw new ProdutoNaoEncontradoException(
                    String.format("Produto com ID %d não encontrado", id)
            );
        }
        repository.deleteById(id);
    }

    /**
     * Validações privadas
     */
    private void validarId(Integer id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID inválido");
        }
    }

    private void validarStringVazia(String valor, String nomeCampo) {
        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException(nomeCampo + " não pode estar vazio");
        }
    }

    private void validarNomeDuplicado(String nomeProduto) {
        if (repository.existsByNomeProdutoIgnoreCase(nomeProduto.trim())) {
            throw new ProdutoDuplicadoException(
                    String.format("Já existe um produto com o nome '%s'", nomeProduto)
            );
        }
    }

    /**
     * Converte Produto para ProdutoResponseDTO.
     */
    private ProdutoResponseDTO converterParaResponseDTO(Produto produto) {
        return ProdutoResponseDTO.builder()
                .id(produto.getId())
                .nomeProduto(produto.getNomeProduto())
                .preco(produto.getPreco())
                .descricao(produto.getDescricao())
                .dataCriacao(produto.getDataCriacao())
                .dataAtualizacao(produto.getDataAtualizacao())
                .build();
    }
}
