import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/loja/loja.component').then(m => m.LojaComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'produtos',
    loadComponent: () => import('./pages/produtos/produtos.component').then(m => m.ProdutosComponent)
  },
  {
    path: 'clientes',
    loadComponent: () => import('./pages/clientes/clientes.component').then(m => m.ClientesComponent)
  },
  {
    path: 'vendas',
    loadComponent: () => import('./pages/vendas/vendas.component').then(m => m.VendasComponent)
  },
  {
    path: 'estoque',
    loadComponent: () => import('./pages/estoque/estoque.component').then(m => m.EstoqueComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
