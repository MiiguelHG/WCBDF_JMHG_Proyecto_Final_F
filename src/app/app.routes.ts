import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { CreditosComponent } from './components/creditos/creditos.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/guard/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', redirectTo: '/dashboard/inicio', pathMatch: 'full'},
            {path: 'inicio', component: InicioComponent},
            {path: 'invoices', component: InvoicesComponent},
            {path: 'creditos', component: CreditosComponent}
        ]
    },
    {path: '**', redirectTo: '/login'}
];
