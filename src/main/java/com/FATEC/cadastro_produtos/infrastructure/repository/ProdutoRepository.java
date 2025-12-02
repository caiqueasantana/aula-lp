package com.FATEC.cadastro_produtos.infrastructure.repository;

import com.FATEC.cadastro_produtos.infrastructure.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    Optional<Produto> findByNomeProdutoIgnoreCase(String nomeProduto);
    
    boolean existsByNomeProdutoIgnoreCase(String nomeProduto);
    
    @Query("SELECT p FROM Produto p WHERE LOWER(p.nomeProduto) LIKE LOWER(CONCAT('%', :nome, '%'))")
    java.util.List<Produto> buscarPorNomeContendo(@Param("nome") String nome);
}
