package com.lojaroupas.api.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lojaroupas.api.dao.ProdutoDao;
import com.lojaroupas.api.dto.ProdutoDto;
import com.lojaroupas.api.dto.ProdutoFiltroDto;
import com.lojaroupas.api.models.Produto;
import com.lojaroupas.api.repositories.ProdutoRepository;
import jakarta.persistence.Tuple;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoDao produtoDao;

    @Autowired
    private ProdutoRepository produtoRepository;

    // Métodos que usam o DAO com queries nativas
    public List<ProdutoDto> getProdutosComFiltros(ProdutoFiltroDto filtro) {
        List<Tuple> tuples = produtoDao.getProdutosComFiltros(filtro);
        return converterTuplesParaDto(tuples);
    }

    public List<ProdutoDto> getProdutosPorTermo(String termo) {
        List<Tuple> tuples = produtoDao.getProdutosPorTermo(termo);
        return converterTuplesParaDto(tuples);
    }

    public List<ProdutoDto> getProdutosPorCategoria(String categoria) {
        List<Tuple> tuples = produtoDao.getProdutosPorCategoria(categoria);
        return converterTuplesParaDto(tuples);
    }

    public List<ProdutoDto> getProdutosNovos() {
        List<Tuple> tuples = produtoDao.getProdutosNovos();
        return converterTuplesParaDto(tuples);
    }

    public List<ProdutoDto> getProdutosPromocao() {
        List<Tuple> tuples = produtoDao.getProdutosPromocao();
        return converterTuplesParaDto(tuples);
    }

    public List<ProdutoDto> getProdutosPorPreco(BigDecimal precoMin, BigDecimal precoMax) {
        List<Tuple> tuples = produtoDao.getProdutosPorPreco(precoMin, precoMax);
        return converterTuplesParaDto(tuples);
    }

    public List<ProdutoDto> getProdutosPorRating(Double rating) {
        List<Tuple> tuples = produtoDao.getProdutosPorRating(rating);
        return converterTuplesParaDto(tuples);
    }

    public List<String> getCategorias() {
        List<Tuple> tuples = produtoDao.getCategorias();
        List<String> categorias = new ArrayList<>();
        for (Tuple tuple : tuples) {
            categorias.add((String) tuple.get("categoria"));
        }
        return categorias;
    }

    public Optional<ProdutoDto> getProdutoPorId(Long id) {
        List<Tuple> tuples = produtoDao.getProdutoPorId(id);
        if (!tuples.isEmpty()) {
            return Optional.of(converterTupleParaDto(tuples.get(0)));
        }
        return Optional.empty();
    }

    public List<ProdutoDto> getAllProdutos() {
        List<Tuple> tuples = produtoDao.getAllProdutos();
        return converterTuplesParaDto(tuples);
    }

    // Métodos que usam o Repository para operações CRUD
    public ProdutoDto criarProduto(ProdutoDto produtoDto) {
        Produto produto = converterDtoParaModel(produtoDto);
        Produto produtoSalvo = produtoRepository.save(produto);
        return converterModelParaDto(produtoSalvo);
    }

    public Optional<ProdutoDto> atualizarProduto(Long id, ProdutoDto produtoDto) {
        if (!produtoRepository.existsById(id)) {
            return Optional.empty();
        }
        Produto produto = converterDtoParaModel(produtoDto);
        produto.setId(id);
        Produto produtoAtualizado = produtoRepository.save(produto);
        return Optional.of(converterModelParaDto(produtoAtualizado));
    }

    public boolean deletarProduto(Long id) {
        if (!produtoRepository.existsById(id)) {
            return false;
        }
        produtoRepository.deleteById(id);
        return true;
    }

    // Métodos auxiliares para conversão
    private List<ProdutoDto> converterTuplesParaDto(List<Tuple> tuples) {
        List<ProdutoDto> produtos = new ArrayList<>();
        for (Tuple tuple : tuples) {
            produtos.add(converterTupleParaDto(tuple));
        }
        return produtos;
    }

    private ProdutoDto converterTupleParaDto(Tuple tuple) {
        ProdutoDto dto = new ProdutoDto();
        dto.setId(((Number) tuple.get("id")).longValue());
        dto.setNome((String) tuple.get("nome"));
        dto.setDescricao((String) tuple.get("descricao"));
        dto.setPreco((BigDecimal) tuple.get("preco"));
        dto.setPrecoOriginal((BigDecimal) tuple.get("precoOriginal"));
        dto.setCategoria((String) tuple.get("categoria"));
        dto.setNovo((Boolean) tuple.get("novo"));
        dto.setDesconto((Integer) tuple.get("desconto"));
        dto.setAvaliacoes((Integer) tuple.get("avaliacoes"));
        dto.setRating((Double) tuple.get("rating"));
        dto.setEstoque((String) tuple.get("estoque"));
        return dto;
    }

    private Produto converterDtoParaModel(ProdutoDto dto) {
        Produto produto = new Produto();
        produto.setId(dto.getId());
        produto.setNome(dto.getNome());
        produto.setDescricao(dto.getDescricao());
        produto.setPreco(dto.getPreco());
        produto.setPrecoOriginal(dto.getPrecoOriginal());
        produto.setCategoria(dto.getCategoria());
        produto.setImagens(dto.getImagens());
        produto.setCores(dto.getCores());
        produto.setTamanhos(dto.getTamanhos());
        produto.setNovo(dto.isNovo());
        produto.setDesconto(dto.getDesconto());
        produto.setAvaliacoes(dto.getAvaliacoes());
        produto.setRating(dto.getRating());
        produto.setEstoque(dto.getEstoque());
        return produto;
    }

    private ProdutoDto converterModelParaDto(Produto produto) {
        ProdutoDto dto = new ProdutoDto();
        dto.setId(produto.getId());
        dto.setNome(produto.getNome());
        dto.setDescricao(produto.getDescricao());
        dto.setPreco(produto.getPreco());
        dto.setPrecoOriginal(produto.getPrecoOriginal());
        dto.setCategoria(produto.getCategoria());
        dto.setImagens(produto.getImagens());
        dto.setCores(produto.getCores());
        dto.setTamanhos(produto.getTamanhos());
        dto.setNovo(produto.isNovo());
        dto.setDesconto(produto.getDesconto());
        dto.setAvaliacoes(produto.getAvaliacoes());
        dto.setRating(produto.getRating());
        dto.setEstoque(produto.getEstoque());
        return dto;
    }
}
