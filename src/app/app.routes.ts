import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { CreditosComponent } from './components/creditos/creditos.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    // {path: 'inicio', component: InicioComponent},
    // {path: 'invoices', component: InvoicesComponent},
    // {path: 'creditos', component: CreditosComponent}
    {
        path: 'dashboard', 
        component: DashboardComponent,
        children: [
            {path: '', redirectTo: '/dashboard/invoices', pathMatch: 'full'},
            {path: 'inicio', component: InicioComponent},
            {path: 'invoices', component: InvoicesComponent},
            {path: 'creditos', component: CreditosComponent}
        ]
    }
];
