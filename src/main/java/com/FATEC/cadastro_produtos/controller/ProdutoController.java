package com.FATEC.cadastro_produtos.controller;

import com.FATEC.cadastro_produtos.business.ProdutosService;
import com.FATEC.cadastro_produtos.presentation.dto.ProdutoRequestDTO;
import com.FATEC.cadastro_produtos.presentation.dto.ProdutoResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/produtos")
@RequiredArgsConstructor
@Tag(name = "Produtos", description = "API de gerenciamento de produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {
    private final ProdutosService produtosService;

    @PostMapping
    @Operation(summary = "Criar novo produto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Produto criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos"),
            @ApiResponse(responseCode = "409", description = "Produto já existe")
    })
    public ResponseEntity<ProdutoResponseDTO> criarProduto(@Valid @RequestBody ProdutoRequestDTO requestDTO) {
        ProdutoResponseDTO produto = produtosService.salvarProduto(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(produto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar produto por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto encontrado"),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado")
    })
    public ResponseEntity<ProdutoResponseDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(produtosService.buscarPorId(id));
    }

    @GetMapping("/nome/{nome}")
    @Operation(summary = "Buscar produto por nome")
    public ResponseEntity<ProdutoResponseDTO> buscarPorNome(@PathVariable String nome) {
        return ResponseEntity.ok(produtosService.buscarPorNome(nome));
    }

    @GetMapping
    @Operation(summary = "Listar todos os produtos com paginação")
    public ResponseEntity<Page<ProdutoResponseDTO>> listarTodos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(produtosService.listarTodos(pageable));
    }

    @GetMapping("/listar/todos")
    @Operation(summary = "Listar todos os produtos sem paginação")
    public ResponseEntity<List<ProdutoResponseDTO>> listarTodosSemPaginacao() {
        return ResponseEntity.ok(produtosService.listarTodosSemPaginacao());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar produto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado"),
            @ApiResponse(responseCode = "409", description = "Nome do produto já existe")
    })
    public ResponseEntity<ProdutoResponseDTO> atualizarProduto(
            @PathVariable Integer id,
            @Valid @RequestBody ProdutoRequestDTO requestDTO) {
        return ResponseEntity.ok(produtosService.atualizarProduto(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar produto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Produto deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado")
    })
    public ResponseEntity<Void> deletarProduto(@PathVariable Integer id) {
        produtosService.deletarProduto(id);
        return ResponseEntity.noContent().build();
    }
}
