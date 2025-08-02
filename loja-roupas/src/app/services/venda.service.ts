import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.service';
import { Produto } from './produto.service';

export interface ItemVenda {
    id?: number;
    produto: Produto;
    quantidade: number;
    precoUnitario: number;
    precoTotal: number;
    tamanho?: string;
    cor?: string;
}

export interface Venda {
    id?: number;
    cliente: Cliente;
    itens: ItemVenda[];
    valorTotal: number;
    status: StatusVenda;
    metodoPagamento: string;
    observacoes?: string;
    dataVenda?: Date;
}

export enum StatusVenda {
    PENDENTE = 'PENDENTE',
    APROVADA = 'APROVADA',
    EM_PREPARACAO = 'EM_PREPARACAO',
    ENVIADA = 'ENVIADA',
    CONCLUIDA = 'CONCLUIDA',
    CANCELADA = 'CANCELADA'
}

export interface VendaStats {
    totalVendas: number;
    totalPedidos: number;
    pedidosPendentes: number;
    pedidosConcluidos: number;
}

@Injectable({
    providedIn: 'root'
})
export class VendaService {
    private apiUrl = 'http://localhost:8080/api/vendas';

    constructor(private http: HttpClient) { }

    // Buscar todas as vendas
    getVendas(): Observable<Venda[]> {
        return this.http.get<Venda[]>(this.apiUrl);
    }

    // Buscar venda por ID
    getVenda(id: number): Observable<Venda> {
        return this.http.get<Venda>(`${this.apiUrl}/${id}`);
    }

    // Buscar vendas por cliente
    getVendasByCliente(clienteId: number): Observable<Venda[]> {
        return this.http.get<Venda[]>(`${this.apiUrl}/cliente/${clienteId}`);
    }

    // Buscar vendas por status
    getVendasByStatus(status: StatusVenda): Observable<Venda[]> {
        return this.http.get<Venda[]>(`${this.apiUrl}/status/${status}`);
    }

    // Buscar vendas por período
    getVendasByPeriodo(dataInicio: string, dataFim: string): Observable<Venda[]> {
        return this.http.get<Venda[]>(`${this.apiUrl}/periodo?dataInicio=${dataInicio}&dataFim=${dataFim}`);
    }

    // Criar venda
    criarVenda(venda: Venda): Observable<Venda> {
        return this.http.post<Venda>(this.apiUrl, venda);
    }

    // Atualizar venda
    atualizarVenda(id: number, venda: Venda): Observable<Venda> {
        return this.http.put<Venda>(`${this.apiUrl}/${id}`, venda);
    }

    // Atualizar status da venda
    atualizarStatusVenda(id: number, status: StatusVenda): Observable<Venda> {
        return this.http.patch<Venda>(`${this.apiUrl}/${id}/status`, { status });
    }

    // Deletar venda
    deletarVenda(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Buscar estatísticas de vendas
    getVendaStats(): Observable<VendaStats> {
        return this.http.get<VendaStats>(`${this.apiUrl}/estatisticas`);
    }
} 