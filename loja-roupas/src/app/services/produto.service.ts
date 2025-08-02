import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    precoOriginal?: number;
    categoria: string;
    imagem?: string; // Para compatibilidade com dados mockados
    imagens: string[];
    cores: string[];
    tamanhos: string[];
    novo: boolean;
    desconto?: number;
    avaliacoes?: number;
    rating?: number;
    estoque?: string | { [cor: string]: { [tamanho: string]: number } };
}

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    private apiUrl = 'http://localhost:8080/api/produtos';

    constructor(private http: HttpClient) { }

    // Buscar todos os produtos
    getProdutos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.apiUrl);
    }

    // Buscar produto por ID
    getProduto(id: number): Observable<Produto> {
        return this.http.get<Produto>(`${this.apiUrl}/${id}`);
    }

    // Buscar produtos por categoria
    getProdutosPorCategoria(categoria: string): Observable<Produto[]> {
        return this.http.get<Produto[]>(`${this.apiUrl}/categoria/${categoria}`);
    }

    // Buscar produtos novos
    getProdutosNovos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(`${this.apiUrl}/novos`);
    }

    // Buscar produtos em promoção
    getProdutosPromocao(): Observable<Produto[]> {
        return this.http.get<Produto[]>(`${this.apiUrl}/promocoes`);
    }

    // Buscar produtos por termo
    buscarProdutos(termo: string): Observable<Produto[]> {
        return this.http.get<Produto[]>(`${this.apiUrl}/buscar?termo=${termo}`);
    }

    // Buscar produtos por faixa de preço
    getProdutosPorPreco(precoMin: number, precoMax: number): Observable<Produto[]> {
        return this.http.get<Produto[]>(`${this.apiUrl}/preco?precoMin=${precoMin}&precoMax=${precoMax}`);
    }

    // Buscar categorias
    getCategorias(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/categorias`);
    }

    // Criar produto
    criarProduto(produto: Produto): Observable<Produto> {
        return this.http.post<Produto>(this.apiUrl, produto);
    }

    // Atualizar produto
    atualizarProduto(id: number, produto: Produto): Observable<Produto> {
        return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
    }

    // Deletar produto
    deletarProduto(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
} 