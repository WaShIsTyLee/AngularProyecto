import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculatorService } from '../../services/calculatorService.service';
import { Calculator } from '../../models/calculator';

@Component({
  standalone: true,
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  imports: [FormsModule, CommonModule],
})
export class CalculatorComponent {
  salary: number = 0;
  extraIncome: number = 0;
  presupuestos: Calculator[] = [];
  presupuestoDisponible: number | null = null;
  listPresupuestosVisible: boolean = false;
  showReport: boolean = false;

  homeExpenses = {
    mortgage: 0,
    homeInsurance: 0,
    homeMaintenance: 0,
    internet: 0,
    phone: 0,
    food: 0,
  };

  transportExpenses = {
    car: 0,
    carInsurance: 0,
    carMaintenance: 0,
    fuel: 0,
    publicTransport: 0,
    taxiUber: 0,
  };

  educationExpenses = {
    education: 0,
    extracurriculars: 0,
    materials: 0,
  };

  otherExpenses = {
    leisure: 0,
    vacations: 0,
    medical: 0,
    pets: 0,
    others: 0,
  };

  savings: number = 0;
  investments: number = 0;
  totalExpenses: number = 0;

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.loadPresupuestos();
  }

  // Método para calcular el presupuesto disponible
  getPresupuestoDisponible(): number {
    const totalIncome = this.salary + this.extraIncome;
    this.totalExpenses =
      Object.values(this.homeExpenses).reduce((sum, value) => sum + value, 0) +
      Object.values(this.transportExpenses).reduce((sum, value) => sum + value, 0) +
      Object.values(this.educationExpenses).reduce((sum, value) => sum + value, 0) +
      Object.values(this.otherExpenses).reduce((sum, value) => sum + value, 0);
    return totalIncome - this.totalExpenses + this.savings + this.investments;
  }

  // Método para alternar la visibilidad del historial
  toggleHistorial(): void {
    this.listPresupuestosVisible = !this.listPresupuestosVisible;
  }

  // Método para cargar todos los presupuestos
  loadPresupuestos(): void {
    this.calculatorService.getCalculators().subscribe(
      (data: Calculator[]) => {
        this.presupuestos = data;
      },
      (error) => {
        console.error('Error al cargar presupuestos:', error);
      }
    );
  }

  // Método para guardar el presupuesto disponible
  savePresupuesto(): void {
    if (this.presupuestoDisponible !== null) {
      this.calculatorService.addPresupuestoDisponible(this.presupuestoDisponible)
        .then(() => {
          console.log('Presupuesto disponible guardado');
          this.loadPresupuestos();
        })
        .catch((error: any) => {
          console.error('Error al guardar presupuesto:', error);
        });
    }
  }

  // Método para seleccionar un presupuesto específico
  onPresupuestoClick(presupuesto: Calculator): void {
    console.log('Presupuesto seleccionado:', presupuesto);
  }

  // Método para borrar todos los presupuestos
  deleteAllPresupuestos(): void {
    this.calculatorService.deleteAllCalculators()
      .then(() => {
        console.log('Todos los presupuestos fueron eliminados');
        this.presupuestos = [];
      })
      .catch((error) => {
        console.error('Error al eliminar los presupuestos:', error);
      });
  }

  // Mostrar informe mensual
  showMonthlyReport() {
    this.showReport = !this.showReport; // Toggle visibility of report
  }
  // Método para calcular el presupuesto disponible
  calculateResults() {
    const totalIncome = this.salary + this.extraIncome;
    const totalExpenses = Object.values(this.homeExpenses).reduce((acc, curr) => acc + curr, 0);
    this.presupuestoDisponible = totalIncome - totalExpenses;
  }

}
