import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

// Models
import { RelatorioEstoque, Produto } from '../../model/estoque';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.scss'
})
export class EstoqueComponent implements OnInit {
  relatorioEstoque: RelatorioEstoque[] = [];

  constructor() {}

  ngOnInit() {
    this.carregarRelatorioEstoque();
  }

  carregarRelatorioEstoque() {
    // Dados mockados para demonstração
    this.relatorioEstoque = [
      {
        produto: { id: 1, nome: 'Camiseta Básica', quantidadeEstoque: 50, quantidadeMinima: 10 },
        quantidadeAtual: 50,
        quantidadeMinima: 10,
        status: 'NORMAL',
        ultimaMovimentacao: new Date('2024-01-15T10:30:00')
      },
      {
        produto: { id: 2, nome: 'Calça Jeans', quantidadeEstoque: 25, quantidadeMinima: 5 },
        quantidadeAtual: 25,
        quantidadeMinima: 5,
        status: 'NORMAL',
        ultimaMovimentacao: new Date('2024-01-15T14:20:00')
      },
      {
        produto: { id: 3, nome: 'Tênis Esportivo', quantidadeEstoque: 15, quantidadeMinima: 3 },
        quantidadeAtual: 15,
        quantidadeMinima: 3,
        status: 'NORMAL',
        ultimaMovimentacao: new Date('2024-01-15T16:45:00')
      },
      {
        produto: { id: 4, nome: 'Boné Esportivo', quantidadeEstoque: 8, quantidadeMinima: 5 },
        quantidadeAtual: 8,
        quantidadeMinima: 5,
        status: 'BAIXO',
        ultimaMovimentacao: new Date('2024-01-14T09:15:00')
      },
      {
        produto: { id: 5, nome: 'Cinto de Couro', quantidadeEstoque: 2, quantidadeMinima: 3 },
        quantidadeAtual: 2,
        quantidadeMinima: 3,
        status: 'CRITICO',
        ultimaMovimentacao: new Date('2024-01-13T11:30:00')
      }
    ];
  }

  getEstoqueClass(quantidade: number): string {
    if (quantidade <= 5) return 'estoque-critico';
    if (quantidade <= 15) return 'estoque-baixo';
    return 'estoque-normal';
  }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'NORMAL':
        return 'success';
      case 'BAIXO':
        return 'warning';
      case 'CRITICO':
        return 'danger';
      default:
        return 'info';
    }
  }

  novaMovimentacao() {
    // Implementar lógica para nova movimentação
    console.log('Nova movimentação');
  }

  entradaEstoque(item: RelatorioEstoque) {
    // Implementar entrada de estoque
    console.log('Entrada de estoque para:', item.produto.nome);
  }

  saidaEstoque(item: RelatorioEstoque) {
    // Implementar saída de estoque
    console.log('Saída de estoque para:', item.produto.nome);
  }

  verHistorico(item: RelatorioEstoque) {
    // Implementar visualização do histórico
    console.log('Ver histórico para:', item.produto.nome);
  }
}
