import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { BudgetSummaryComponent } from './pages/budget-summary/budget-summary.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGoogleComponent } from './components/login-google/login-google.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'calculadora', component: CalculatorComponent },
    { path: 'resumen', component: BudgetSummaryComponent },
    { path: 'login', component: LoginGoogleComponent }
];