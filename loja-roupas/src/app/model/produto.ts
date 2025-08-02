export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  tamanho: string;
  cor: string;
  preco: number;
  precoCusto: number;
  quantidadeEstoque: number;
  quantidadeMinima: number;
  fornecedor: string;
  codigoBarras: string;
  dataCadastro: Date;
  ativo: boolean;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
}

export interface Tamanho {
  id: number;
  nome: string;
  descricao: string;
} 