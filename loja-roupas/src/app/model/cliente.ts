export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  dataCadastro: Date;
  observacoes: string;
  ativo: boolean;
}

export interface HistoricoCompra {
  id: number;
  clienteId: number;
  dataCompra: Date;
  valor: number;
  produtos: string[];
  status: 'pendente' | 'pago' | 'cancelado';
  observacoes?: string;
}

export interface ObservacaoCliente {
  id: number;
  clienteId: number;
  data: Date;
  observacao: string;
  tipo: 'pagamento' | 'visita' | 'preferencia' | 'outro';
} 