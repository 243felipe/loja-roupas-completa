import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produto, ProdutoService } from '../../services/produto.service';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    CheckboxModule,
    DialogModule,
    ConfirmDialogModule,
    TagModule,
    TooltipModule,
    ProgressSpinnerModule,
    ChipModule
  ],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  produto: Produto = this.criarProdutoVazio();
  editando = false;
  showModal = false;
  loading = false;
  categorias: string[] = [
    'Camisetas',
    'Calças',
    'Vestidos',
    'Saias',
    'Blusas',
    'Jaquetas',
    'Casacos',
    'Shorts',
    'Bermudas',
    'Tênis',
    'Sapatos',
    'Acessórios',
    'Roupas Íntimas',
    'Esportivo',
    'Outros'
  ];
  tamanhos: string[] = ['P', 'M', 'G'];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.carregarProdutos();
    this.carregarCategorias();
  }

  carregarProdutos() {
    this.loading = true;
    this.produtoService.getProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.loading = false;
      }
    });
  }

  carregarCategorias() {
    // Categorias já definidas no array da classe
  }

  abrirModal(produto?: Produto) {
    if (produto) {
      this.produto = { ...produto };
      this.editando = true;
    } else {
      this.produto = this.criarProdutoVazio();
      this.editando = false;
    }
    this.showModal = true;
  }

  fecharModal() {
    this.showModal = false;
    this.produto = this.criarProdutoVazio();
    this.editando = false;
  }

  salvarProduto() {
    if (this.validarProduto()) {
      this.loading = true;

      // Preparar dados para envio
      const produtoParaEnviar = {
        ...this.produto,
        preco: Number(this.produto.preco),
        precoOriginal: this.produto.precoOriginal ? Number(this.produto.precoOriginal) : undefined,
        desconto: this.produto.desconto ? Number(this.produto.desconto) : undefined,
        rating: this.produto.rating ? Number(this.produto.rating) : undefined,
        avaliacoes: this.produto.avaliacoes ? Number(this.produto.avaliacoes) : undefined
      };

      if (this.editando) {
        this.produtoService.atualizarProduto(this.produto.id!, produtoParaEnviar).subscribe({
          next: () => {
            this.carregarProdutos();
            this.fecharModal();
            this.loading = false;
            alert('Produto atualizado com sucesso!');
          },
          error: (error) => {
            console.error('Erro ao atualizar produto:', error);
            this.loading = false;
            alert('Erro ao atualizar produto. Verifique o console para mais detalhes.');
          }
        });
      } else {
        console.log('Enviando produto para criação:', produtoParaEnviar);
        this.produtoService.criarProduto(produtoParaEnviar).subscribe({
          next: (produtoCriado) => {
            console.log('Produto criado com sucesso:', produtoCriado);
            this.carregarProdutos();
            this.fecharModal();
            this.loading = false;
            alert('Produto criado com sucesso!');
          },
          error: (error) => {
            console.error('Erro ao criar produto:', error);
            console.error('Detalhes do erro:', error.error);
            this.loading = false;
            alert('Erro ao criar produto. Verifique o console para mais detalhes.');
          }
        });
      }
    }
  }

  deletarProduto(id: number) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.loading = true;
      this.produtoService.deletarProduto(id).subscribe({
        next: () => {
          this.carregarProdutos();
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao deletar produto:', error);
          this.loading = false;
        }
      });
    }
  }

  validarProduto(): boolean {
    console.log('Validando produto:', this.produto);
    
    if (!this.produto.nome || !this.produto.descricao || !this.produto.categoria) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return false;
    }
    if (this.produto.preco <= 0) {
      alert('O preço deve ser maior que zero');
      return false;
    }
    if (this.produto.tamanhos.length === 0) {
      alert('Selecione pelo menos um tamanho');
      return false;
    }
    if (this.produto.imagens.length === 0) {
      alert('Adicione pelo menos uma imagem');
      return false;
    }
    return true;
  }

  adicionarImagem() {
    const url = prompt('Digite a URL da imagem:');
    if (url) {
      this.produto.imagens.push(url);
    }
  }

  removerImagem(index: number) {
    this.produto.imagens.splice(index, 1);
  }



  selecionarTamanho(tamanho: string) {
    const index = this.produto.tamanhos.indexOf(tamanho);
    if (index > -1) {
      this.produto.tamanhos.splice(index, 1);
    } else {
      this.produto.tamanhos.push(tamanho);
    }
  }

  isTamanhoSelecionado(tamanho: string): boolean {
    return this.produto.tamanhos.includes(tamanho);
  }

  criarProdutoVazio(): Produto {
    return {
      id: 0,
      nome: '',
      descricao: '',
      preco: 0,
      categoria: '',
            imagens: [],
      cores: [],
      tamanhos: [],
      novo: false,
      estoque: '{}'
    };
  }

  getStatusClass(status: boolean): string {
    return status ? 'status-ativo' : 'status-inativo';
  }

  getStatusText(status: boolean): string {
    return status ? 'Ativo' : 'Inativo';
  }


}
