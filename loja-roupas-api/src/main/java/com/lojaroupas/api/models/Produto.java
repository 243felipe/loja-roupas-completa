package com.lojaroupas.api.models;

import java.math.BigDecimal;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(precision = 10, scale = 2)
    private BigDecimal precoOriginal;

    @Column(nullable = false)
    private String categoria;

    @ElementCollection
    @CollectionTable(name = "produto_imagens", joinColumns = @JoinColumn(name = "produto_id"))
    @Column(name = "imagem_url")
    private List<String> imagens;

    @ElementCollection
    @CollectionTable(name = "produto_cores", joinColumns = @JoinColumn(name = "produto_id"))
    @Column(name = "cor")
    private List<String> cores;

    @ElementCollection
    @CollectionTable(name = "produto_tamanhos", joinColumns = @JoinColumn(name = "produto_id"))
    @Column(name = "tamanho")
    private List<String> tamanhos;

    private boolean novo;

    private Integer desconto;

    private Integer avaliacoes;

    private Double rating;

    @Column(columnDefinition = "TEXT")
    private String estoque; // JSON string para armazenar estoque por cor/tamanho

    // Construtores
    public Produto() {}

    public Produto(String nome, String descricao, BigDecimal preco, String categoria) {
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
