package com.lojaroupas.api.dto;

import java.math.BigDecimal;

public class ProdutoFiltroDto {
    private String termo;
    private String categoria;
    private BigDecimal precoMin;
    private BigDecimal precoMax;
    private Double rating;
    private Boolean novo;
    private Boolean promocao;
    private Integer page;
    private Integer size;

    // Construtores
    public ProdutoFiltroDto() {}

    // Getters e Setters
    public String getTermo() {
        return termo;
    }

    public void setTermo(String termo) {
        this.termo = termo;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public BigDecimal getPrecoMin() {
        return precoMin;
    }

    public void setPrecoMin(BigDecimal precoMin) {
        this.precoMin = precoMin;
    }

    public BigDecimal getPrecoMax() {
        return precoMax;
    }

    public void setPrecoMax(BigDecimal precoMax) {
        this.precoMax = precoMax;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Boolean getNovo() {
        return novo;
    }

    public void setNovo(Boolean novo) {
        this.novo = novo;
    }

    public Boolean getPromocao() {
        return promocao;
    }

    public void setPromocao(Boolean promocao) {
        this.promocao = promocao;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }
}
