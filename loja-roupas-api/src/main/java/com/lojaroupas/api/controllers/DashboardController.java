package com.lojaroupas.api.controllers;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.lojaroupas.api.models.Venda;
import com.lojaroupas.api.repositories.ClienteRepository;
import com.lojaroupas.api.repositories.ProdutoRepository;
import com.lojaroupas.api.repositories.VendaRepository;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VendaRepository vendaRepository;

    // Estatísticas gerais do dashboard
    @GetMapping("/estatisticas")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // Estatísticas de produtos
        long totalProdutos = produtoRepository.count();
        long produtosNovos = produtoRepository.findByNovoTrue().size();
        long produtosComDesconto = produtoRepository.findByDescontoIsNotNull().size();

        // Estatísticas de clientes
        long totalClientes = clienteRepository.count();

        // Estatísticas de vendas
        long totalVendas = vendaRepository.count();
        long vendasPendentes = vendaRepository.findByStatus(Venda.StatusVenda.PENDENTE).size();
        long vendasConcluidas = vendaRepository.findByStatus(Venda.StatusVenda.ENTREGUE).size();

        // Calcular valor total das vendas
        BigDecimal valorTotalVendas = vendaRepository.findAll().stream().map(Venda::getValorTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Produtos mais vendidos (simulado - você pode implementar uma query específica)
        long produtosVendidos = 0; // Implementar lógica real

        stats.put("totalProdutos", totalProdutos);
        stats.put("produtosNovos", produtosNovos);
        stats.put("produtosComDesconto", produtosComDesconto);
        stats.put("totalClientes", totalClientes);
        stats.put("totalVendas", totalVendas);
        stats.put("vendasPendentes", vendasPendentes);
        stats.put("vendasConcluidas", vendasConcluidas);
        stats.put("valorTotalVendas", valorTotalVendas);
        stats.put("produtosVendidos", produtosVendidos);

        return ResponseEntity.ok(stats);
    }

    // Estatísticas de vendas por período
    @GetMapping("/vendas-periodo")
    public ResponseEntity<Map<String, Object>> getVendasPorPeriodo(
            @RequestParam(defaultValue = "7") int dias) {

        LocalDateTime dataInicio = LocalDateTime.now().minusDays(dias);
        LocalDateTime dataFim = LocalDateTime.now();

        var vendas = vendaRepository.findByDataVendaBetween(dataInicio, dataFim);

        Map<String, Object> stats = new HashMap<>();
        stats.put("periodoDias", dias);
        stats.put("totalVendas", vendas.size());
        stats.put("valorTotal",
                vendas.stream().mapToDouble(v -> v.getValorTotal().doubleValue()).sum());
        stats.put("vendas", vendas);

        return ResponseEntity.ok(stats);
    }

    // Produtos mais populares
    @GetMapping("/produtos-populares")
    public ResponseEntity<Map<String, Object>> getProdutosPopulares() {
        Map<String, Object> stats = new HashMap<>();

        // Produtos com melhor rating
        var produtosMelhorRating = produtoRepository.findByRatingGreaterThanEqual(4.0);

        // Produtos novos
        var produtosNovos = produtoRepository.findByNovoTrue();

        // Produtos em promoção
        var produtosPromocao = produtoRepository.findByDescontoIsNotNull();

        stats.put("melhorRating", produtosMelhorRating);
        stats.put("produtosNovos", produtosNovos);
        stats.put("produtosPromocao", produtosPromocao);

        return ResponseEntity.ok(stats);
    }

    // Resumo financeiro
    @GetMapping("/resumo-financeiro")
    public ResponseEntity<Map<String, Object>> getResumoFinanceiro() {
        Map<String, Object> resumo = new HashMap<>();

        var todasVendas = vendaRepository.findAll();

        // Vendas do mês atual
        LocalDateTime inicioMes = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0);
        var vendasMes = vendaRepository.findByDataVendaBetween(inicioMes, LocalDateTime.now());

        double totalMes =
                vendasMes.stream().mapToDouble(v -> v.getValorTotal().doubleValue()).sum();

        double totalGeral =
                todasVendas.stream().mapToDouble(v -> v.getValorTotal().doubleValue()).sum();

        resumo.put("vendasMes", vendasMes.size());
        resumo.put("totalMes", totalMes);
        resumo.put("totalGeral", totalGeral);
        resumo.put("mediaVenda", todasVendas.isEmpty() ? 0 : totalGeral / todasVendas.size());

        return ResponseEntity.ok(resumo);
    }

    // Alertas do sistema
    @GetMapping("/alertas")
    public ResponseEntity<Map<String, Object>> getAlertas() {
        Map<String, Object> alertas = new HashMap<>();

        // Produtos com estoque baixo (simulado)
        long produtosEstoqueBaixo = 0;

        // Vendas pendentes
        long vendasPendentes = vendaRepository.findByStatus(Venda.StatusVenda.PENDENTE).size();

        // Clientes novos (últimos 7 dias)
        LocalDateTime dataInicio = LocalDateTime.now().minusDays(7);
        long clientesNovos = clienteRepository.findAll().stream()
                .filter(cliente -> cliente.getDataCadastro() != null
                        && cliente.getDataCadastro().isAfter(dataInicio))
                .count();

        alertas.put("produtosEstoqueBaixo", produtosEstoqueBaixo);
        alertas.put("vendasPendentes", vendasPendentes);
        alertas.put("clientesNovos", clientesNovos);

        return ResponseEntity.ok(alertas);
    }
}
