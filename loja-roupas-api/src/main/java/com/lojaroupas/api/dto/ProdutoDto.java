package com.lojaroupas.api.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProdutoDto {
    private Long id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private BigDecimal precoOriginal;
    private String categoria;
    private List<String> imagens;
    private List<String> cores;
    private List<String> tamanhos;
    private boolean novo;
    private Integer desconto;
    private Integer avaliacoes;
    private Double rating;
    private String estoque;

    // Construtores
    public ProdutoDto() {}

    public ProdutoDto(Long id, String nome, String descricao, BigDecimal preco, String categoria) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public BigDecimal getPrecoOriginal() {
        return precoOriginal;
    }

    public void setPrecoOriginal(BigDecimal precoOriginal) {
        this.precoOriginal = precoOriginal;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }

    public List<String> getCores() {
        return cores;
    }

    public void setCores(List<String> cores) {
        this.cores = cores;
    }

    public List<String> getTamanhos() {
        return tamanhos;
    }

    public void setTamanhos(List<String> tamanhos) {
        this.tamanhos = tamanhos;
    }

    public boolean isNovo() {
        return novo;
    }

    public void setNovo(boolean novo) {
        this.novo = novo;
    }

    public Integer getDesconto() {
        return desconto;
    }

    public void setDesconto(Integer desconto) {
        this.desconto = desconto;
    }

    public Integer getAvaliacoes() {
        return avaliacoes;
    }

    public void setAvaliacoes(Integer avaliacoes) {
        this.avaliacoes = avaliacoes;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getEstoque() {
        return estoque;
    }

    public void setEstoque(String estoque) {
        this.estoque = estoque;
    }
}
