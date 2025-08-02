package com.lojaroupas.api.repositories;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.lojaroupas.api.models.Venda;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

    List<Venda> findByClienteId(Long clienteId);

    List<Venda> findByStatus(Venda.StatusVenda status);

    @Query("SELECT v FROM Venda v WHERE v.dataVenda BETWEEN :dataInicio AND :dataFim")
    List<Venda> findByDataVendaBetween(@Param("dataInicio") LocalDateTime dataInicio,
            @Param("dataFim") LocalDateTime dataFim);

    @Query("SELECT v FROM Venda v WHERE v.cliente.id = :clienteId AND v.status = :status")
    List<Venda> findByClienteIdAndStatus(@Param("clienteId") Long clienteId,
            @Param("status") Venda.StatusVenda status);
}
