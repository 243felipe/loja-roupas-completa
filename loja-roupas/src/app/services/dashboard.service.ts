import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from './produto.service';
import { Venda } from './venda.service';

export interface DashboardStats {
    totalProdutos: number;
    produtosNovos: number;
    produtosComDesconto: number;
    totalClientes: number;
    totalVendas: number;
    vendasPendentes: number;
    vendasConcluidas: number;
    valorTotalVendas: number;
    produtosVendidos: number;
}

export interface VendasPeriodo {
    periodoDias: number;
    totalVendas: number;
    valorTotal: number;
    vendas: Venda[];
}

export interface ProdutosPopulares {
    melhorRating: Produto[];
    produtosNovos: Produto[];
    produtosPromocao: Produto[];
}

export interface ResumoFinanceiro {
    vendasMes: number;
    totalMes: number;
    totalGeral: number;
    mediaVenda: number;
}

export interface Alertas {
    produtosEstoqueBaixo: number;
    vendasPendentes: number;
    clientesNovos: number;
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiUrl = 'http://localhost:8080/api/dashboard';

    constructor(private http: HttpClient) { }

    // Buscar estatísticas gerais do dashboard
    getDashboardStats(): Observable<DashboardStats> {
        return this.http.get<DashboardStats>(`${this.apiUrl}/estatisticas`);
    }

    // Buscar vendas por período
    getVendasPorPeriodo(dias: number = 7): Observable<VendasPeriodo> {
        return this.http.get<VendasPeriodo>(`${this.apiUrl}/vendas-periodo?dias=${dias}`);
    }

    // Buscar produtos populares
    getProdutosPopulares(): Observable<ProdutosPopulares> {
        return this.http.get<ProdutosPopulares>(`${this.apiUrl}/produtos-populares`);
    }

    // Buscar resumo financeiro
    getResumoFinanceiro(): Observable<ResumoFinanceiro> {
        return this.http.get<ResumoFinanceiro>(`${this.apiUrl}/resumo-financeiro`);
    }

    // Buscar alertas do sistema
    getAlertas(): Observable<Alertas> {
        return this.http.get<Alertas>(`${this.apiUrl}/alertas`);
    }
} 