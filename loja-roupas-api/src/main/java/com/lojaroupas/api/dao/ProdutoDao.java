package com.lojaroupas.api.dao;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Repository;
import com.lojaroupas.api.dto.ProdutoFiltroDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Tuple;

@Repository
public class ProdutoDao {

    @PersistenceContext
    private EntityManager entityManager;

    // Query base para produtos
    private static final String queryProdutosBase =
            "SELECT p.id as id, " + "       p.nome as nome, " + "       p.descricao as descricao, "
                    + "       p.preco as preco, " + "       p.preco_original as precoOriginal, "
                    + "       p.categoria as categoria, " + "       p.novo as novo, "
                    + "       p.desconto as desconto, " + "       p.avaliacoes as avaliacoes, "
                    + "       p.rating as rating, " + "       p.estoque as estoque "
                    + "FROM produtos p " + "WHERE 1=1 ";

    // Query para buscar por termo
    private static final String queryProdutosPorTermo = "SELECT p.id as id, "
            + "       p.nome as nome, " + "       p.descricao as descricao, "
            + "       p.preco as preco, " + "       p.preco_original as precoOriginal, "
            + "       p.categoria as categoria, " + "       p.novo as novo, "
            + "       p.desconto as desconto, " + "       p.avaliacoes as avaliacoes, "
            + "       p.rating as rating, " + "       p.estoque as estoque " + "FROM produtos p "
            + "WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :termo, '%')) "
            + "   OR LOWER(p.descricao) LIKE LOWER(CONCAT('%', :termo, '%')) ";

    // Query para buscar por categoria
    private static final String queryProdutosPorCategoria =
            "SELECT p.id as id, " + "       p.nome as nome, " + "       p.descricao as descricao, "
                    + "       p.preco as preco, " + "       p.preco_original as precoOriginal, "
                    + "       p.categoria as categoria, " + "       p.novo as novo, "
                    + "       p.desconto as desconto, " + "       p.avaliacoes as avaliacoes, "
                    + "       p.rating as rating, " + "       p.estoque as estoque "
                    + "FROM produtos p " + "WHERE p.categoria = :categoria ";

    // Query para buscar produtos novos
    private static final String queryProdutosNovos =
            "SELECT p.id as id, " + "       p.nome as nome, " + "       p.descricao as descricao, "
                    + "       p.preco as preco, " + "       p.preco_original as precoOriginal, "
                    + "       p.categoria as categoria, " + "       p.novo as novo, "
                    + "       p.desconto as desconto, " + "       p.avaliacoes as avaliacoes, "
                    + "       p.rating as rating, " + "       p.estoque as estoque "
                    + "FROM produtos p " + "WHERE p.novo = true ";

    // Query para buscar produtos em promoção
    private static final String queryProdutosPromocao =
            "SELECT p.id as id, " + "       p.nome as nome, " + "       p.descricao as descricao, "
                    + "       p.preco as preco, " + "       p.preco_original as precoOriginal, "
                    + "       p.categoria as categoria, " + "       p.novo as novo, "
                    + "       p.desconto as desconto, " + "       p.avaliacoes as avaliacoes, "
                    + "       p.rating as rating, " + "       p.estoque as estoque "
                    + "FROM produtos p " + "WHERE p.desconto IS NOT NULL ";

    // Query para buscar por faixa de preço
    private static final String queryProdutosPorPreco =
            "SELECT p.id as id, " + "       p.nome as nome, " + "       p.descricao as descricao, "
                    + "       p.preco as preco, " + "       p.preco_original as precoOriginal, "
                    + "       p.categoria as categoria, " + "       p.novo as novo, "
                    + "       p.desconto as desconto, " + "       p.avaliacoes as avaliacoes, "
                    + "       p.rating as rating, " + "       p.estoque as estoque "
                    + "FROM produtos p " + "WHERE p.preco BETWEEN :precoMin AND :precoMax ";

    // Query para buscar por rating
    private static final String queryProdutosPorRating =
            "SELECT p.id as id, " + "       p.nome as nome, " + "       p.descricao as descricao, "
                    + "       p.preco as preco, " + "       p.preco_original as precoOriginal, "
                    + "       p.categoria as categoria, " + "       p.novo as novo, "
                    + "       p.desconto as desconto, " + "       p.avaliacoes as avaliacoes, "
                    + "       p.rating as rating, " + "       p.estoque as estoque "
                    + "FROM produtos p " + "WHERE p.rating >= :rating " + "ORDER BY p.rating DESC ";

    // Query para buscar categorias
    private static final String queryCategorias = "SELECT DISTINCT p.categoria as categoria "
            + "FROM produtos p " + "ORDER BY p.categoria ";

    // Query para buscar produto por ID
    private static final String queryProdutoPorId =
            "SELECT p.id as id, " + "       p.nome as nome, " + "       p.descricao as descricao, "
                    + "       p.preco as preco, " + "       p.preco_original as precoOriginal, "
                    + "       p.categoria as categoria, " + "       p.novo as novo, "
                    + "       p.desconto as desconto, " + "       p.avaliacoes as avaliacoes, "
                    + "       p.rating as rating, " + "       p.estoque as estoque "
                    + "FROM produtos p " + "WHERE p.id = :id ";

    // Métodos para buscar produtos com filtros
    public List<Tuple> getProdutosComFiltros(ProdutoFiltroDto filtro) {
        StringBuilder query = new StringBuilder(queryProdutosBase);

        if (filtro.getCategoria() != null) {
            query.append("AND p.categoria = :categoria ");
        }
        if (filtro.getPrecoMin() != null && filtro.getPrecoMax() != null) {
            query.append("AND p.preco BETWEEN :precoMin AND :precoMax ");
        }
        if (filtro.getRating() != null) {
            query.append("AND p.rating >= :rating ");
        }
        if (filtro.getNovo() != null && filtro.getNovo()) {
            query.append("AND p.novo = true ");
        }
        if (filtro.getPromocao() != null && filtro.getPromocao()) {
            query.append("AND p.desconto IS NOT NULL ");
        }

        query.append("ORDER BY p.id ");

        // Adicionar paginação se especificada
        if (filtro.getPage() != null && filtro.getSize() != null) {
            query.append("LIMIT :size OFFSET :offset ");
        }

        jakarta.persistence.Query jpaQuery =
                entityManager.createNativeQuery(query.toString(), Tuple.class);

        // Definir parâmetros
        if (filtro.getCategoria() != null) {
            jpaQuery.setParameter("categoria", filtro.getCategoria());
        }
        if (filtro.getPrecoMin() != null && filtro.getPrecoMax() != null) {
            jpaQuery.setParameter("precoMin", filtro.getPrecoMin());
            jpaQuery.setParameter("precoMax", filtro.getPrecoMax());
        }
        if (filtro.getRating() != null) {
            jpaQuery.setParameter("rating", filtro.getRating());
        }
        if (filtro.getPage() != null && filtro.getSize() != null) {
            jpaQuery.setParameter("size", filtro.getSize());
            jpaQuery.setParameter("offset", filtro.getPage() * filtro.getSize());
        }

        return jpaQuery.getResultList();
    }

    public List<Tuple> getProdutosPorTermo(String termo) {
        jakarta.persistence.Query query = entityManager
                .createNativeQuery(queryProdutosPorTermo, Tuple.class).setParameter("termo", termo);
        return query.getResultList();
    }

    public List<Tuple> getProdutosPorCategoria(String categoria) {
        jakarta.persistence.Query query =
                entityManager.createNativeQuery(queryProdutosPorCategoria, Tuple.class)
                        .setParameter("categoria", categoria);
        return query.getResultList();
    }

    public List<Tuple> getProdutosNovos() {
        jakarta.persistence.Query query =
                entityManager.createNativeQuery(queryProdutosNovos, Tuple.class);
        return query.getResultList();
    }

    public List<Tuple> getProdutosPromocao() {
        jakarta.persistence.Query query =
                entityManager.createNativeQuery(queryProdutosPromocao, Tuple.class);
        return query.getResultList();
    }

    public List<Tuple> getProdutosPorPreco(BigDecimal precoMin, BigDecimal precoMax) {
        jakarta.persistence.Query query =
                entityManager.createNativeQuery(queryProdutosPorPreco, Tuple.class)
                        .setParameter("precoMin", precoMin).setParameter("precoMax", precoMax);
        return query.getResultList();
    }

    public List<Tuple> getProdutosPorRating(Double rating) {
        jakarta.persistence.Query query =
                entityManager.createNativeQuery(queryProdutosPorRating, Tuple.class)
                        .setParameter("rating", rating);
        return query.getResultList();
    }

    public List<Tuple> getCategorias() {
        jakarta.persistence.Query query =
                entityManager.createNativeQuery(queryCategorias, Tuple.class);
        return query.getResultList();
    }

    public List<Tuple> getProdutoPorId(Long id) {
        jakarta.persistence.Query query = entityManager
                .createNativeQuery(queryProdutoPorId, Tuple.class).setParameter("id", id);
        return query.getResultList();
    }

    public List<Tuple> getAllProdutos() {
        jakarta.persistence.Query query =
                entityManager.createNativeQuery(queryProdutosBase + "ORDER BY p.id", Tuple.class);
        return query.getResultList();
    }
}
