package com.lojaroupas.api.repositories;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.lojaroupas.api.models.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByCategoria(String categoria);

    List<Produto> findByNovoTrue();

    List<Produto> findByDescontoIsNotNull();

    @Query("SELECT p FROM Produto p WHERE p.preco BETWEEN :precoMin AND :precoMax")
    List<Produto> findByPrecoBetween(@Param("precoMin") BigDecimal precoMin,
            @Param("precoMax") BigDecimal precoMax);

    @Query("SELECT p FROM Produto p WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :termo, '%')) OR LOWER(p.descricao) LIKE LOWER(CONCAT('%', :termo, '%'))")
    List<Produto> findByNomeOrDescricaoContainingIgnoreCase(@Param("termo") String termo);

    @Query("SELECT DISTINCT p.categoria FROM Produto p ORDER BY p.categoria")
    List<String> findAllCategorias();

    @Query("SELECT p FROM Produto p WHERE p.rating >= :rating ORDER BY p.rating DESC")
    List<Produto> findByRatingGreaterThanEqual(@Param("rating") Double rating);
}
