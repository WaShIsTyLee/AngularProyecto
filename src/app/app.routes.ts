import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { ClimaComponent } from './components/clima/clima.component'; // Importing the ClimaComponent

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'calculadora-de-presupuesto', component: CalculatorComponent },
  { path: 'login', component: LoginGoogleComponent },
  { path: 'clima', component: ClimaComponent } // Adding the clima route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
