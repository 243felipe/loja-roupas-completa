package com.lojaroupas.api.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.util.List;

@Repository
public class ClientesDao {

    @PersistenceContext
    private EntityManager entityManager;

    private static final String QUERY_GET_CLIENTES = """
        SELECT id, ativo, cep, cidade, data_cadastro, email, endereco, estado, nome, senha, telefone, ultimo_acesso
        FROM clientes c 
        WHERE c.id = :id
    """;

    public List<Object[]> queryGetClienteDao(Integer id) {
        return entityManager.createNativeQuery(QUERY_GET_CLIENTES)
                .setParameter("id", id)
                .getResultList();
    }
}

