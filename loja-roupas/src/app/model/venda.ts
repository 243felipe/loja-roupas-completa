export interface Venda {
  id: number;
  numeroVenda: string;
  dataVenda: Date;
  cliente: Cliente;
  itens: ItemVenda[];
  subtotal: number;
  desconto: number;
  total: number;
  formaPagamento: string;
  status: string;
  observacoes: string;
}

export interface ItemVenda {
  id: number;
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
  desconto: number;
  total: number;
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  dataCadastro: Date;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidadeEstoque: number;
} 