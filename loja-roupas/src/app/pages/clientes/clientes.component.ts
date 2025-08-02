import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../../services/cliente.service';

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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-clientes',
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
    CalendarModule
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = this.criarClienteVazio();
  editando = false;
  showModal = false;
  loading = false;
  searchTerm = '';
  selectedEstado = '';

  estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.loading = true;
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        this.loading = false;
      }
    });
  }

  abrirModal(cliente?: Cliente) {
    if (cliente) {
      this.cliente = { ...cliente };
      this.editando = true;
    } else {
      this.cliente = this.criarClienteVazio();
      this.editando = false;
    }
    this.showModal = true;
  }

  fecharModal() {
    this.showModal = false;
    this.cliente = this.criarClienteVazio();
    this.editando = false;
  }

  salvarCliente() {
    if (this.validarCliente()) {
      this.loading = true;

      if (this.editando) {
        this.clienteService.atualizarCliente(this.cliente.id!, this.cliente).subscribe({
          next: () => {
            this.carregarClientes();
            this.fecharModal();
            this.loading = false;
          },
          error: (error) => {
            console.error('Erro ao atualizar cliente:', error);
            this.loading = false;
          }
        });
      } else {
        this.clienteService.criarCliente(this.cliente).subscribe({
          next: () => {
            this.carregarClientes();
            this.fecharModal();
            this.loading = false;
          },
          error: (error) => {
            console.error('Erro ao criar cliente:', error);
            this.loading = false;
          }
        });
      }
    }
  }

  deletarCliente(id: number) {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.loading = true;
      this.clienteService.deletarCliente(id).subscribe({
        next: () => {
          this.carregarClientes();
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao deletar cliente:', error);
          this.loading = false;
        }
      });
    }
  }

  validarCliente(): boolean {
    if (!this.cliente.nome || !this.cliente.email || !this.cliente.senha) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.cliente.email)) {
      alert('Por favor, insira um email válido');
      return false;
    }

    if (this.cliente.senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    return true;
  }

  criarClienteVazio(): Cliente {
    return {
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: ''
    };
  }

  getClientesFiltrados(): Cliente[] {
    let clientes = this.clientes;

    if (this.searchTerm) {
      clientes = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cliente.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (cliente.telefone && cliente.telefone.includes(this.searchTerm))
      );
    }

    if (this.selectedEstado) {
      clientes = clientes.filter(cliente => cliente.estado === this.selectedEstado);
    }

    return clientes;
  }

  formatarTelefone(telefone: string): string {
    if (!telefone) return '';

    const cleaned = telefone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return telefone;
  }

  formatarCEP(cep: string): string {
    if (!cep) return '';

    const cleaned = cep.replace(/\D/g, '');
    if (cleaned.length === 8) {
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }
    return cep;
  }

  getStatusClass(cliente: Cliente): string {
    return cliente.dataCadastro ? 'status-ativo' : 'status-inativo';
  }

  getStatusText(cliente: Cliente): string {
    return cliente.dataCadastro ? 'Ativo' : 'Inativo';
  }
} 