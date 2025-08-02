import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../../services/cliente.service';
import { Produto, ProdutoService } from '../../services/produto.service';
import { StatusVenda, Venda, VendaService } from '../../services/venda.service';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-vendas',
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
    ChipModule,
    CalendarModule,
    MultiSelectModule
  ],
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {
  vendas: Venda[] = [];
  venda: Venda = this.criarVendaVazia();
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  editando = false;
  showModal = false;
  loading = false;
  searchTerm = '';
  selectedStatus: StatusVenda | '' = '';
  selectedCliente: Cliente | null = null;

  statusOptions = [
    { label: 'Pendente', value: StatusVenda.PENDENTE },
    { label: 'Aprovada', value: StatusVenda.APROVADA },
    { label: 'Em Preparação', value: StatusVenda.EM_PREPARACAO },
    { label: 'Enviada', value: StatusVenda.ENVIADA },
    { label: 'Concluída', value: StatusVenda.CONCLUIDA },
    { label: 'Cancelada', value: StatusVenda.CANCELADA }
  ];

  metodoPagamentoOptions = [
    'Cartão de Crédito',
    'Cartão de Débito',
    'PIX',
    'Boleto',
    'Dinheiro',
    'Transferência'
  ];

  constructor(
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.carregarVendas();
    this.carregarClientes();
    this.carregarProdutos();
  }

  carregarVendas() {
    this.loading = true;
    this.vendaService.getVendas().subscribe({
      next: (vendas) => {
        this.vendas = vendas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar vendas:', error);
        this.loading = false;
      }
    });
  }

  carregarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    });
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    });
  }

  abrirModal(venda?: Venda) {
    if (venda) {
      this.venda = { ...venda };
      this.editando = true;
    } else {
      this.venda = this.criarVendaVazia();
      this.editando = false;
    }
    this.showModal = true;
  }

  fecharModal() {
    this.showModal = false;
    this.venda = this.criarVendaVazia();
    this.editando = false;
  }

  salvarVenda() {
    if (this.validarVenda()) {
      this.loading = true;

      if (this.editando) {
        this.vendaService.atualizarVenda(this.venda.id!, this.venda).subscribe({
          next: () => {
            this.carregarVendas();
            this.fecharModal();
            this.loading = false;
          },
          error: (error) => {
            console.error('Erro ao atualizar venda:', error);
            this.loading = false;
          }
        });
      } else {
        this.vendaService.criarVenda(this.venda).subscribe({
          next: () => {
            this.carregarVendas();
            this.fecharModal();
            this.loading = false;
          },
          error: (error) => {
            console.error('Erro ao criar venda:', error);
            this.loading = false;
          }
        });
      }
    }
  }

  deletarVenda(id: number) {
    if (confirm('Tem certeza que deseja deletar esta venda?')) {
      this.loading = true;
      this.vendaService.deletarVenda(id).subscribe({
        next: () => {
          this.carregarVendas();
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao deletar venda:', error);
          this.loading = false;
        }
      });
    }
  }

  atualizarStatus(venda: Venda, novoStatus: StatusVenda) {
    this.vendaService.atualizarStatusVenda(venda.id!, novoStatus).subscribe({
      next: () => {
        this.carregarVendas();
      },
      error: (error) => {
        console.error('Erro ao atualizar status:', error);
      }
    });
  }

  validarVenda(): boolean {
    if (!this.venda.cliente || !this.venda.itens || this.venda.itens.length === 0) {
      alert('Por favor, selecione um cliente e adicione pelo menos um item');
      return false;
    }

    if (!this.venda.metodoPagamento) {
      alert('Por favor, selecione um método de pagamento');
      return false;
    }

    if (this.venda.valorTotal <= 0) {
      alert('O valor total deve ser maior que zero');
      return false;
    }

    return true;
  }

  criarVendaVazia(): Venda {
    return {
      cliente: {} as Cliente,
      itens: [],
      valorTotal: 0,
      status: StatusVenda.PENDENTE,
      metodoPagamento: '',
      observacoes: ''
    };
  }

  adicionarItem() {
    const produto = this.produtos[0]; // Produto padrão
    if (produto) {
      this.venda.itens.push({
        produto: produto,
        quantidade: 1,
        precoUnitario: produto.preco,
        precoTotal: produto.preco,
        tamanho: produto.tamanhos[0] || '',
        cor: produto.cores[0] || ''
      });
      this.calcularValorTotal();
    }
  }

  removerItem(index: number) {
    this.venda.itens.splice(index, 1);
    this.calcularValorTotal();
  }

  calcularValorTotal() {
    this.venda.valorTotal = this.venda.itens.reduce((total, item) => {
      return total + (item.precoUnitario * item.quantidade);
    }, 0);
  }

  atualizarItemPreco(index: number) {
    const item = this.venda.itens[index];
    item.precoTotal = item.precoUnitario * item.quantidade;
    this.calcularValorTotal();
  }

  getVendasFiltradas(): Venda[] {
    let vendas = this.vendas;

    if (this.searchTerm) {
      vendas = vendas.filter(venda =>
        venda.cliente.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        venda.id?.toString().includes(this.searchTerm)
      );
    }

    if (this.selectedStatus) {
      vendas = vendas.filter(venda => venda.status === this.selectedStatus);
    }

    if (this.selectedCliente) {
      vendas = vendas.filter(venda => venda.cliente.id === this.selectedCliente?.id);
    }

    return vendas;
  }

  getStatusSeverity(status: StatusVenda): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case StatusVenda.PENDENTE: return 'warning';
      case StatusVenda.APROVADA: return 'info';
      case StatusVenda.EM_PREPARACAO: return 'secondary';
      case StatusVenda.ENVIADA: return 'info';
      case StatusVenda.CONCLUIDA: return 'success';
      case StatusVenda.CANCELADA: return 'danger';
      default: return 'warning';
    }
  }

  getStatusText(status: StatusVenda): string {
    switch (status) {
      case StatusVenda.PENDENTE: return 'Pendente';
      case StatusVenda.APROVADA: return 'Aprovada';
      case StatusVenda.EM_PREPARACAO: return 'Em Preparação';
      case StatusVenda.ENVIADA: return 'Enviada';
      case StatusVenda.CONCLUIDA: return 'Concluída';
      case StatusVenda.CANCELADA: return 'Cancelada';
      default: return status;
    }
  }
}
