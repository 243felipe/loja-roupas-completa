import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Chart, registerables } from 'chart.js';

// Models
import { Cliente, HistoricoCompra, ObservacaoCliente } from '../../model/cliente';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('vendasChart') vendasChartRef!: ElementRef;
  @ViewChild('produtosChart') produtosChartRef!: ElementRef;

  vendasChart: any;
  produtosChart: any;

  // Dados para o slideshow de observações
  clientes: Cliente[] = [];
  historicoCompras: HistoricoCompra[] = [];
  observacoes: ObservacaoCliente[] = [];
  
  currentSlideIndex = 0;
  slideInterval: any;
  slideData: any[] = [];

  ngOnInit() {
    this.carregarDados();
    this.prepararSlideshow();
    this.iniciarSlideshow();
  }

  ngAfterViewInit() {
    this.initVendasChart();
    this.initProdutosChart();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  carregarDados() {
    // Dados mockados dos clientes
    this.clientes = [
      {
        id: 1,
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 99999-9999',
        cpf: '123.456.789-00',
        endereco: 'Rua das Flores, 123',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-567',
        dataCadastro: new Date('2024-01-15'),
        observacoes: 'Cliente preferencial, sempre paga em dia',
        ativo: true
      },
      {
        id: 2,
        nome: 'Maria Santos',
        email: 'maria@email.com',
        telefone: '(11) 88888-8888',
        cpf: '987.654.321-00',
        endereco: 'Av. Paulista, 456',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01310-100',
        dataCadastro: new Date('2024-02-20'),
        observacoes: 'Gosta de roupas coloridas',
        ativo: true
      },
      {
        id: 3,
        nome: 'Pedro Costa',
        email: 'pedro@email.com',
        telefone: '(11) 77777-7777',
        cpf: '456.789.123-00',
        endereco: 'Rua Augusta, 789',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01305-000',
        dataCadastro: new Date('2024-03-10'),
        observacoes: 'Cliente novo, primeira compra',
        ativo: true
      },
      {
        id: 4,
        nome: 'Ana Oliveira',
        email: 'ana@email.com',
        telefone: '(11) 66666-6666',
        cpf: '789.123.456-00',
        endereco: 'Av. Brigadeiro Faria Lima, 1000',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01452-002',
        dataCadastro: new Date('2024-04-05'),
        observacoes: 'Prefere roupas elegantes',
        ativo: true
      }
    ];

    this.historicoCompras = [
      {
        id: 1,
        clienteId: 1,
        dataCompra: new Date('2024-07-20'),
        valor: 150.00,
        produtos: ['Camiseta Básica', 'Calça Jeans'],
        status: 'pago',
        observacoes: 'Pagamento em dinheiro'
      },
      {
        id: 2,
        clienteId: 1,
        dataCompra: new Date('2024-07-25'),
        valor: 89.90,
        produtos: ['Tênis Esportivo'],
        status: 'pendente',
        observacoes: 'Vai pagar na próxima semana'
      },
      {
        id: 3,
        clienteId: 2,
        dataCompra: new Date('2024-07-22'),
        valor: 200.00,
        produtos: ['Vestido Floral', 'Sapato Social'],
        status: 'pago',
        observacoes: 'Pagamento com cartão'
      },
      {
        id: 4,
        clienteId: 3,
        dataCompra: new Date('2024-07-24'),
        valor: 75.50,
        produtos: ['Camiseta Polo'],
        status: 'pago',
        observacoes: 'Primeira compra'
      },
      {
        id: 5,
        clienteId: 4,
        dataCompra: new Date('2024-07-26'),
        valor: 320.00,
        produtos: ['Blazer Elegante', 'Calça Social'],
        status: 'pendente',
        observacoes: 'Vai retirar na loja'
      }
    ];

    this.observacoes = [
      {
        id: 1,
        clienteId: 1,
        data: new Date('2024-07-25'),
        observacao: 'Cliente disse que vai vir na próxima semana para pagar',
        tipo: 'pagamento'
      },
      {
        id: 2,
        clienteId: 2,
        data: new Date('2024-07-24'),
        observacao: 'Prefere roupas em tons de azul',
        tipo: 'preferencia'
      },
      {
        id: 3,
        clienteId: 3,
        data: new Date('2024-07-26'),
        observacao: 'Cliente muito satisfeito com o atendimento',
        tipo: 'outro'
      },
      {
        id: 4,
        clienteId: 4,
        data: new Date('2024-07-27'),
        observacao: 'Vai retirar os produtos na próxima terça-feira',
        tipo: 'visita'
      }
    ];
  }

  prepararSlideshow() {
    this.slideData = this.clientes.map(cliente => {
      const ultimaCompra = this.getUltimaCompra(cliente.id);
      const ultimaObservacao = this.getUltimaObservacao(cliente.id);
      
      return {
        cliente,
        ultimaCompra,
        ultimaObservacao
      };
    }).filter(item => item.ultimaObservacao); // Só inclui clientes com observações
  }

  getUltimaCompra(clienteId: number): HistoricoCompra | null {
    const compras = this.historicoCompras
      .filter(h => h.clienteId === clienteId)
      .sort((a, b) => new Date(b.dataCompra).getTime() - new Date(a.dataCompra).getTime());
    
    return compras.length > 0 ? compras[0] : null;
  }

  getUltimaObservacao(clienteId: number): ObservacaoCliente | null {
    const obs = this.observacoes
      .filter(o => o.clienteId === clienteId)
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    
    return obs.length > 0 ? obs[0] : null;
  }

  iniciarSlideshow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Muda a cada 4 segundos
  }

  nextSlide() {
    if (this.slideData.length > 0) {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slideData.length;
    }
  }

  previousSlide() {
    if (this.slideData.length > 0) {
      this.currentSlideIndex = this.currentSlideIndex === 0 
        ? this.slideData.length - 1 
        : this.currentSlideIndex - 1;
    }
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
  }

  getTipoObservacaoLabel(tipo: string): string {
    const tipos = {
      'pagamento': 'Pagamento',
      'visita': 'Visita',
      'preferencia': 'Preferência',
      'outro': 'Outro'
    };
    return tipos[tipo as keyof typeof tipos] || tipo;
  }

  initVendasChart() {
    const ctx = this.vendasChartRef.nativeElement.getContext('2d');
    this.vendasChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
        datasets: [{
          label: 'Vendas Mensais',
          data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  initProdutosChart() {
    const ctx = this.produtosChartRef.nativeElement.getContext('2d');
    this.produtosChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Camisetas', 'Calças', 'Vestidos', 'Sapatos', 'Acessórios'],
        datasets: [{
          label: 'Produtos Vendidos',
          data: [65, 45, 30, 25, 15],
          backgroundColor: [
            '#667eea',
            '#f093fb',
            '#4facfe',
            '#43e97b',
            '#fa709a'
          ],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}
