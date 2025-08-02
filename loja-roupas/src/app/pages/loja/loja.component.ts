import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal?: number;
  categoria: string;
  tamanho: string[];
  cor: string[];
  imagem: string;
  imagens: string[];
  emEstoque: boolean;
  destaque: boolean;
}

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    SliderModule,
    DialogModule,
    CarouselModule,
    TagModule,
    DividerModule
  ],
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  produtoSelecionado: Produto | null = null;
  modalVisible = false;
  
  // Filtros
  busca = '';
  categoriaSelecionada = '';
  tamanhoSelecionado = '';
  corSelecionada = '';
  precoRange: number[] = [0, 1000];
  
  categorias = ['Todas', 'Camisetas', 'Calças', 'Sapatos', 'Acessórios'];
  tamanhos = ['Todos', 'P', 'M', 'G', 'GG'];
  cores = ['Todas', 'Preto', 'Branco', 'Azul', 'Vermelho', 'Verde'];

  ngOnInit() {
    this.carregarProdutos();
    this.aplicarFiltros();
  }

  carregarProdutos() {
    // Dados mockados para demonstração
    this.produtos = [
      {
        id: 1,
        nome: 'Camiseta Básica',
        descricao: 'Camiseta 100% algodão, confortável e durável. Perfeita para o dia a dia.',
        preco: 49.90,
        precoOriginal: 69.90,
        categoria: 'Camisetas',
        tamanho: ['P', 'M', 'G', 'GG'],
        cor: ['Preto', 'Branco', 'Azul'],
        imagem: 'assets/image/1.jpg',
        imagens: ['assets/image/1.jpg', 'assets/image/2.jpg', 'assets/image/3.jpg'],
        emEstoque: true,
        destaque: true
      },
      {
        id: 2,
        nome: 'Calça Jeans Slim',
        descricao: 'Calça jeans moderna com corte slim, ideal para looks casuais e elegantes.',
        preco: 129.90,
        categoria: 'Calças',
        tamanho: ['M', 'G', 'GG'],
        cor: ['Azul', 'Preto'],
        imagem: 'assets/image/4.jpg',
        imagens: ['assets/image/4.jpg', 'assets/image/5.jpg'],
        emEstoque: true,
        destaque: true
      },
      {
        id: 3,
        nome: 'Tênis Esportivo',
        descricao: 'Tênis confortável para atividades físicas e uso casual.',
        preco: 199.90,
        precoOriginal: 249.90,
        categoria: 'Sapatos',
        tamanho: ['38', '39', '40', '41', '42'],
        cor: ['Branco', 'Preto'],
        imagem: 'assets/image/6.jpg',
        imagens: ['assets/image/6.jpg', 'assets/image/7.jpg'],
        emEstoque: true,
        destaque: false
      },
      {
        id: 4,
        nome: 'Relógio Elegante',
        descricao: 'Relógio com design moderno e elegante, perfeito para ocasiões especiais.',
        preco: 299.90,
        categoria: 'Acessórios',
        tamanho: ['Único'],
        cor: ['Preto', 'Prata'],
        imagem: 'assets/image/8.jpg',
        imagens: ['assets/image/8.jpg', 'assets/image/9.jpg'],
        emEstoque: true,
        destaque: true
      },
      {
        id: 5,
        nome: 'Jaqueta Bomber',
        descricao: 'Jaqueta bomber com estilo urbano e confortável.',
        preco: 179.90,
        categoria: 'Camisetas',
        tamanho: ['M', 'G', 'GG'],
        cor: ['Preto', 'Verde'],
        imagem: 'assets/image/10.jpg',
        imagens: ['assets/image/10.jpg', 'assets/image/11.jpg'],
        emEstoque: true,
        destaque: false
      },
      {
        id: 6,
        nome: 'Bolsa Casual',
        descricao: 'Bolsa prática e elegante para o dia a dia.',
        preco: 89.90,
        categoria: 'Acessórios',
        tamanho: ['Único'],
        cor: ['Marrom', 'Preto'],
        imagem: 'assets/image/1.jpg',
        imagens: ['assets/image/1.jpg', 'assets/image/2.jpg'],
        emEstoque: true,
        destaque: false
      }
    ];
  }

  aplicarFiltros() {
    this.produtosFiltrados = this.produtos.filter(produto => {
      // Filtro de busca
      const matchBusca = !this.busca || 
        produto.nome.toLowerCase().includes(this.busca.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(this.busca.toLowerCase());
      
      // Filtro de categoria
      const matchCategoria = !this.categoriaSelecionada || 
        this.categoriaSelecionada === 'Todas' || 
        produto.categoria === this.categoriaSelecionada;
      
      // Filtro de tamanho
      const matchTamanho = !this.tamanhoSelecionado || 
        this.tamanhoSelecionado === 'Todos' || 
        produto.tamanho.includes(this.tamanhoSelecionado);
      
      // Filtro de cor
      const matchCor = !this.corSelecionada || 
        this.corSelecionada === 'Todas' || 
        produto.cor.includes(this.corSelecionada);
      
      // Filtro de preço
      const matchPreco = produto.preco >= this.precoRange[0] && 
        produto.preco <= this.precoRange[1];
      
      return matchBusca && matchCategoria && matchTamanho && matchCor && matchPreco;
    });
  }

  abrirModal(produto: Produto) {
    this.produtoSelecionado = produto;
    this.modalVisible = true;
  }

  fecharModal() {
    this.modalVisible = false;
    this.produtoSelecionado = null;
  }

  limparFiltros() {
    this.busca = '';
    this.categoriaSelecionada = '';
    this.tamanhoSelecionado = '';
    this.corSelecionada = '';
    this.precoRange = [0, 1000];
    this.aplicarFiltros();
  }

  getProdutosDestaque() {
    return this.produtos.filter(p => p.destaque);
  }

  calcularDesconto(preco: number, precoOriginal?: number): number {
    if (!precoOriginal) return 0;
    return Math.round(((precoOriginal - preco) / precoOriginal) * 100);
  }

  getColorValue(cor: string): string {
    const colorMap: { [key: string]: string } = {
      'Preto': '#000000',
      'Branco': '#FFFFFF',
      'Azul': '#0066CC',
      'Vermelho': '#FF0000',
      'Verde': '#00AA00',
      'Prata': '#C0C0C0',
      'Marrom': '#8B4513'
    };
    return colorMap[cor] || '#CCCCCC';
  }

  openCart(): void {
    console.log('Abrindo carrinho de compras');
    // Implementar lógica do carrinho
  }

  goToLogin(): void {
    console.log('Navegando para tela de login');
    // Implementar navegação para login
  }

  addToCart(produto: Produto): void {
    console.log('Produto adicionado ao carrinho:', produto.nome);
    // Implementar lógica do carrinho
  }

  addToFavorites(produto: Produto): void {
    console.log('Produto adicionado aos favoritos:', produto.nome);
    // Implementar lógica dos favoritos
  }
} 