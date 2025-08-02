package com.lojaroupas.api.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.lojaroupas.api.models.Venda;
import com.lojaroupas.api.repositories.VendaRepository;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "*")
public class VendaController {

    @Autowired
    private VendaRepository vendaRepository;

    // Listar todas as vendas
    @GetMapping
    public List<Venda> getAllVendas() {
        return vendaRepository.findAll();
    }

    // Buscar venda por ID
    @GetMapping("/{id}")
    public ResponseEntity<Venda> getVendaById(@PathVariable Long id) {
        Optional<Venda> venda = vendaRepository.findById(id);
        return venda.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar vendas por cliente
    @GetMapping("/cliente/{clienteId}")
    public List<Venda> getVendasByCliente(@PathVariable Long clienteId) {
        return vendaRepository.findByClienteId(clienteId);
    }

    // Buscar vendas por status
    @GetMapping("/status/{status}")
    public List<Venda> getVendasByStatus(@PathVariable Venda.StatusVenda status) {
        return vendaRepository.findByStatus(status);
    }

    // Buscar vendas por período
    @GetMapping("/periodo")
    public List<Venda> getVendasByPeriodo(@RequestParam String dataInicio,
            @RequestParam String dataFim) {
        LocalDateTime inicio = LocalDateTime.parse(dataInicio);
        LocalDateTime fim = LocalDateTime.parse(dataFim);
        return vendaRepository.findByDataVendaBetween(inicio, fim);
    }

    // Criar nova venda
    @PostMapping
    public Venda createVenda(@RequestBody Venda venda) {
        venda.setDataVenda(LocalDateTime.now());
        return vendaRepository.save(venda);
    }

    // Atualizar venda
    @PutMapping("/{id}")
    public ResponseEntity<Venda> updateVenda(@PathVariable Long id,
            @RequestBody Venda vendaDetails) {
        Optional<Venda> venda = vendaRepository.findById(id);
        if (venda.isPresent()) {
            Venda vendaToUpdate = venda.get();
            vendaToUpdate.setCliente(vendaDetails.getCliente());
            vendaToUpdate.setItens(vendaDetails.getItens());
            vendaToUpdate.setValorTotal(vendaDetails.getValorTotal());
            vendaToUpdate.setStatus(vendaDetails.getStatus());
            vendaToUpdate.setFormaPagamento(vendaDetails.getFormaPagamento());
            vendaToUpdate.setObservacoes(vendaDetails.getObservacoes());

            Venda updatedVenda = vendaRepository.save(vendaToUpdate);
            return ResponseEntity.ok(updatedVenda);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Atualizar status da venda
    @PatchMapping("/{id}/status")
    public ResponseEntity<Venda> updateVendaStatus(@PathVariable Long id,
            @RequestBody StatusUpdateRequest request) {
        Optional<Venda> venda = vendaRepository.findById(id);
        if (venda.isPresent()) {
            Venda vendaToUpdate = venda.get();
            vendaToUpdate.setStatus(request.getStatus());
            Venda updatedVenda = vendaRepository.save(vendaToUpdate);
            return ResponseEntity.ok(updatedVenda);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Deletar venda
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenda(@PathVariable Long id) {
        Optional<Venda> venda = vendaRepository.findById(id);
        if (venda.isPresent()) {
            vendaRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Estatísticas de vendas
    @GetMapping("/estatisticas")
    public ResponseEntity<VendaStats> getVendaStats() {
        List<Venda> todasVendas = vendaRepository.findAll();

        double totalVendas =
                todasVendas.stream().mapToDouble(v -> v.getValorTotal().doubleValue()).sum();

        long totalPedidos = todasVendas.size();

        long pedidosPendentes = todasVendas.stream()
                .filter(v -> v.getStatus() == Venda.StatusVenda.PENDENTE).count();

        long pedidosConcluidos = todasVendas.stream()
                .filter(v -> v.getStatus() == Venda.StatusVenda.ENTREGUE).count();

        VendaStats stats = new VendaStats();
        stats.setTotalVendas(totalVendas);
        stats.setTotalPedidos(totalPedidos);
        stats.setPedidosPendentes(pedidosPendentes);
        stats.setPedidosConcluidos(pedidosConcluidos);

        return ResponseEntity.ok(stats);
    }

    // Classe interna para request de atualização de status
    public static class StatusUpdateRequest {
        private Venda.StatusVenda status;

        public Venda.StatusVenda getStatus() {
            return status;
        }

        public void setStatus(Venda.StatusVenda status) {
            this.status = status;
        }
    }

    // Classe interna para estatísticas
    public static class VendaStats {
        private double totalVendas;
        private long totalPedidos;
        private long pedidosPendentes;
        private long pedidosConcluidos;

        public double getTotalVendas() {
            return totalVendas;
        }

        public void setTotalVendas(double totalVendas) {
            this.totalVendas = totalVendas;
        }

        public long getTotalPedidos() {
            return totalPedidos;
        }

        public void setTotalPedidos(long totalPedidos) {
            this.totalPedidos = totalPedidos;
        }

        public long getPedidosPendentes() {
            return pedidosPendentes;
        }

        public void setPedidosPendentes(long pedidosPendentes) {
            this.pedidosPendentes = pedidosPendentes;
        }

        public long getPedidosConcluidos() {
            return pedidosConcluidos;
        }

        public void setPedidosConcluidos(long pedidosConcluidos) {
            this.pedidosConcluidos = pedidosConcluidos;
        }
    }
}
