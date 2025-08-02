export interface MovimentacaoEstoque {
  id: number;
  produto: Produto;
  tipo: 'ENTRADA' | 'SAIDA';
  quantidade: number;
  dataMovimentacao: Date;
  motivo: string;
  observacoes: string;
  usuario: string;
}

export interface Produto {
  id: number;
  nome: string;
  quantidadeEstoque: number;
  quantidadeMinima: number;
}

export interface RelatorioEstoque {
  produto: Produto;
  quantidadeAtual: number;
  quantidadeMinima: number;
  status: 'NORMAL' | 'BAIXO' | 'CRITICO';
  ultimaMovimentacao: Date;
} 