import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { LojaComponent } from './pages/loja/loja.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/loja', pathMatch: 'full' },
  
  // Rotas públicas (sem header/sidebar)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'loja', component: LojaComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  
  // Rotas administrativas (com header/sidebar)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'produtos', component: ProdutosComponent },
      { path: 'vendas', component: VendasComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'estoque', component: EstoqueComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  { path: '**', redirectTo: '/loja' }
];
