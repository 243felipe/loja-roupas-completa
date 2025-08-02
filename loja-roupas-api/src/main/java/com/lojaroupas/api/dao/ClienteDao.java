package com.lojaroupas.api.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Tuple;

@Repository
public class ClienteDao {

    @PersistenceContext
    private EntityManager entityManager;

    // Query base para clientes
    private static final String queryClientesBase =
            "SELECT c.id as id, " + "       c.nome as nome, " + "       c.email as email, "
                    + "       c.telefone as telefone, " + "       c.endereco as endereco, "
                    + "       c.cidade as cidade, " + "       c.estado as estado, "
                    + "       c.cep as cep " + "FROM clientes c " + "WHERE 1=1 ";

    // Query para buscar cliente por ID
    private static final String queryClientePorId =
            "SELECT c.id as id, " + "       c.nome as nome, " + "       c.email as email, "
                    + "       c.telefone as telefone, " + "       c.endereco as endereco, "
                    + "       c.cidade as cidade, " + "       c.estado as estado, "
                    + "       c.cep as cep " + "FROM clientes c " + "WHERE c.id = :id ";

    // Query para buscar cliente por email
    private static final String queryClientePorEmail =
            "SELECT c.id as id, " + "       c.nome as nome, " + "       c.email as email, "
                    + "       c.telefone as telefone, " + "       c.endereco as endereco, "
                    + "       c.cidade as cidade, " + "       c.estado as estado, "
                    + "       c.cep as cep " + "FROM clientes c " + "WHERE c.email = :email ";

    // Query para login
    private static final String queryClienteLogin = "SELECT c.id as id, "
            + "       c.nome as nome, " + "       c.email as email, "
            + "       c.telefone as telefone, " + "       c.endereco as endereco, "
            + "       c.cidade as cidade, " + "       c.estado as estado, " + "       c.cep as cep "
            + "FROM clientes c " + "WHERE c.email = :email " + "  AND c.senha = :senha ";

    // Query para verificar se email existe
    private static final String queryEmailExists =
            "SELECT COUNT(*) as count " + "FROM clientes c " + "WHERE c.email = :email ";

    // Métodos para buscar clientes
    public List<Tuple> getAllClientes() {
        jakarta.persistence.Query query =
                entityManager.createNativeQuery(queryClientesBase + "ORDER BY c.nome", Tuple.class);
        return query.getResultList();
    }

    public List<Tuple> getClientePorId(Long id) {
        jakarta.persistence.Query query = entityManager
                .createNativeQuery(queryClientePorId, Tuple.class).setParameter("id", id);
        return query.getResultList();
    }

    public List<Tuple> getClientePorEmail(String email) {
        jakarta.persistence.Query query = entityManager
                .createNativeQuery(queryClientePorEmail, Tuple.class).setParameter("email", email);
        return query.getResultList();
    }

    public List<Tuple> getClienteLogin(String email, String senha) {
        jakarta.persistence.Query query =
                entityManager.createNativeQuery(queryClienteLogin, Tuple.class)
                        .setParameter("email", email).setParameter("senha", senha);
        return query.getResultList();
    }

    public boolean emailExists(String email) {
        jakarta.persistence.Query query =
                entityManager.createNativeQuery(queryEmailExists).setParameter("email", email);
        Long count = ((Number) query.getSingleResult()).longValue();
        return count > 0;
    }
}
