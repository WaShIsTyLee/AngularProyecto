import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  imports: [FormsModule, CommonModule]
})

export class CalculatorComponent {
  // Variables existentes
  salary: number = 0;
  extraIncome: number = 0;

  homeExpenses = {
    mortgage: 0,
    homeInsurance: 0,
    homeMaintenance: 0,
    internet: 0,
    phone: 0,
    food: 0
  };

  transportExpenses = {
    car: 0,
    carInsurance: 0,
    carMaintenance: 0,
    fuel: 0,
    publicTransport: 0,
    taxiUber: 0
  };

  educationExpenses = {
    education: 0,
    extracurriculars: 0,
    materials: 0
  };

  otherExpenses = {
    leisure: 0,
    vacations: 0,
    medical: 0,
    pets: 0,
    others: 0
  };

  savings: number = 0;  // Ahorros
  investments: number = 0;  // Inversiones

  // Propiedad para el resultado
  presupuestoDisponible: number | null = null;
  message: string = '';  // Mensaje de error o advertencia
  totalExpenses: number = 0;  // Total de gastos

  // Método para calcular el presupuesto disponible considerando ingresos, gastos, ahorros e inversiones
  getPresupuestoDisponible(): number {
    // Usar salary y extraIncome para calcular los ingresos
    const totalIncome = this.salary + this.extraIncome;
    
    // Sumar los gastos de las distintas categorías
    this.totalExpenses =
      Object.values(this.homeExpenses).reduce((sum, value) => sum + value, 0) +
      Object.values(this.transportExpenses).reduce((sum, value) => sum + value, 0) +
      Object.values(this.educationExpenses).reduce((sum, value) => sum + value, 0) +
      Object.values(this.otherExpenses).reduce((sum, value) => sum + value, 0);

    // El presupuesto disponible incluye también ahorros e inversiones
    return totalIncome - this.totalExpenses + this.savings + this.investments;  // Presupuesto disponible
  }

  // Método para calcular el presupuesto disponible y mostrarlo en la interfaz
  calculateResults() {
    this.presupuestoDisponible = this.getPresupuestoDisponible();

    // Verificar si los fondos son suficientes
    if (this.presupuestoDisponible < 0) {
      this.message = "¡Te faltan fondos! Revisa tus gastos.";
    } else {
      this.message = '';
    }
  }
}
