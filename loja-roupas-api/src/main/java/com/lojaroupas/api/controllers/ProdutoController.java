package com.lojaroupas.api.controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.lojaroupas.api.dto.ProdutoDto;
import com.lojaroupas.api.dto.ProdutoFiltroDto;
import com.lojaroupas.api.services.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<List<ProdutoDto>> listarTodos() {
        List<ProdutoDto> produtos = produtoService.getAllProdutos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDto> buscarPorId(@PathVariable Long id) {
        Optional<ProdutoDto> produto = produtoService.getProdutoPorId(id);
        return produto.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProdutoDto>> buscarPorCategoria(@PathVariable String categoria) {
        List<ProdutoDto> produtos = produtoService.getProdutosPorCategoria(categoria);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/novos")
    public ResponseEntity<List<ProdutoDto>> buscarNovos() {
        List<ProdutoDto> produtos = produtoService.getProdutosNovos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/promocoes")
    public ResponseEntity<List<ProdutoDto>> buscarPromocoes() {
        List<ProdutoDto> produtos = produtoService.getProdutosPromocao();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ProdutoDto>> buscarPorTermo(@RequestParam String termo) {
        List<ProdutoDto> produtos = produtoService.getProdutosPorTermo(termo);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/preco")
    public ResponseEntity<List<ProdutoDto>> buscarPorFaixaPreco(@RequestParam BigDecimal precoMin,
            @RequestParam BigDecimal precoMax) {
        List<ProdutoDto> produtos = produtoService.getProdutosPorPreco(precoMin, precoMax);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<String>> listarCategorias() {
        List<String> categorias = produtoService.getCategorias();
        return ResponseEntity.ok(categorias);
    }

    @PostMapping("/filtros")
    public ResponseEntity<List<ProdutoDto>> buscarComFiltros(@RequestBody ProdutoFiltroDto filtro) {
        List<ProdutoDto> produtos = produtoService.getProdutosComFiltros(filtro);
        return ResponseEntity.ok(produtos);
    }

    @PostMapping
    public ResponseEntity<ProdutoDto> criar(@RequestBody ProdutoDto produtoDto) {
        ProdutoDto produtoSalvo = produtoService.criarProduto(produtoDto);
        return ResponseEntity.ok(produtoSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoDto> atualizar(@PathVariable Long id,
            @RequestBody ProdutoDto produtoDto) {
        Optional<ProdutoDto> produtoAtualizado = produtoService.atualizarProduto(id, produtoDto);
        return produtoAtualizado.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean deletado = produtoService.deletarProduto(id);
        return deletado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
