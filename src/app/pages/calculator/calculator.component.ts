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
  loading: boolean = false;  // Variable para mostrar el spinner

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

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.loadPresupuestos();
  }

  private isValidNumber(value: number): boolean {
    return !isNaN(value) && value >= 0;
  }

  private validateInputs(): boolean {
    const errors: string[] = [];

    // Validar ingresos
    if (!this.isValidNumber(this.salary)) {
      errors.push('El salario debe ser un número positivo.');
      this.salary = 0; // Limpiar el campo
    }
    if (!this.isValidNumber(this.extraIncome)) {
      errors.push('El ingreso extra debe ser un número positivo.');
      this.extraIncome = 0; // Limpiar el campo
    }

    // Validar gastos del hogar
    for (const key in this.homeExpenses) {
      if (this.homeExpenses.hasOwnProperty(key)) {
        if (!this.isValidNumber(this.homeExpenses[key as keyof typeof this.homeExpenses])) {
          errors.push(`El gasto de ${key} debe ser un número positivo.`);
          this.homeExpenses[key as keyof typeof this.homeExpenses] = 0; // Limpiar el campo
        }
      }
    }

    // Validar gastos de transporte
    for (const key in this.transportExpenses) {
      if (this.transportExpenses.hasOwnProperty(key)) {
        if (!this.isValidNumber(this.transportExpenses[key as keyof typeof this.transportExpenses])) {
          errors.push(`El gasto de transporte en ${key} debe ser un número positivo.`);
          this.transportExpenses[key as keyof typeof this.transportExpenses] = 0; // Limpiar el campo
        }
      }
    }

    // Validar gastos de educación
    for (const key in this.educationExpenses) {
      if (this.educationExpenses.hasOwnProperty(key)) {
        if (!this.isValidNumber(this.educationExpenses[key as keyof typeof this.educationExpenses])) {
          errors.push(`El gasto de educación en ${key} debe ser un número positivo.`);
          this.educationExpenses[key as keyof typeof this.educationExpenses] = 0; // Limpiar el campo
        }
      }
    }

    // Validar otros gastos
    for (const key in this.otherExpenses) {
      if (this.otherExpenses.hasOwnProperty(key)) {
        if (!this.isValidNumber(this.otherExpenses[key as keyof typeof this.otherExpenses])) {
          errors.push(`El gasto en ${key} debe ser un número positivo.`);
          this.otherExpenses[key as keyof typeof this.otherExpenses] = 0; // Limpiar el campo
        }
      }
    }

    // Validar ahorros
    if (!this.isValidNumber(this.savings)) {
      errors.push('Los ahorros deben ser un número positivo.');
      this.savings = 0; // Limpiar el campo
    }

    // Validar inversiones
    if (!this.isValidNumber(this.investments)) {
      errors.push('Las inversiones deben ser un número positivo.');
      this.investments = 0; // Limpiar el campo
    }

    // Mostrar errores si existen
    if (errors.length > 0) {
      alert('Errores de validación:\n' + errors.join('\n'));
      return false;
    }

    return true;
  }

  getPresupuestoDisponible(): number {
    if (!this.validateInputs()) {
      return 0;
    }

    const totalIncome = this.salary + this.extraIncome;
    this.totalExpenses =
      Object.values(this.homeExpenses).reduce((sum, value) => sum + value, 0) +
      Object.values(this.transportExpenses).reduce((sum, value) => sum + value, 0) +
      Object.values(this.educationExpenses).reduce((sum, value) => sum + value, 0) +
      Object.values(this.otherExpenses).reduce((sum, value) => sum + value, 0);

    return totalIncome - this.totalExpenses + this.savings + this.investments;
  }

  toggleHistorial(): void {
    this.listPresupuestosVisible = !this.listPresupuestosVisible;
    
    if (this.listPresupuestosVisible) {
      this.loading = true;  // Activar el spinner antes de cargar los datos
      this.loadPresupuestos();  // Llamar a la función para cargar los presupuestos
    }
  }
  

  loadPresupuestos(): void {
    this.loading = true;  // Activar el spinner antes de cargar los datos
    this.calculatorService.getCalculators().subscribe(
      (data: Calculator[]) => {
        this.presupuestos = data;
        this.loading = false;  // Desactivar el spinner una vez cargados los datos
      },
      (error) => {
        console.error('Error al cargar presupuestos:', error);
        this.loading = false;  // Desactivar el spinner en caso de error
      }
    );
  }

  savePresupuesto(): void {
    if (this.presupuestoDisponible !== null && this.validateInputs()) {
      this.calculatorService.addPresupuestoDisponible(this.presupuestoDisponible)
        .then(() => {
          console.log('Presupuesto disponible guardado');
          this.loadPresupuestos();
        })
        .catch((error: any) => {
          console.error('Error al guardar presupuesto:', error);
        });
    } else {
      alert('No se puede guardar el presupuesto. Los datos son inválidos.');
    }
  }

  onPresupuestoClick(presupuesto: Calculator): void {
    console.log('Presupuesto seleccionado:', presupuesto);
  }

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

  showMonthlyReport() {
    this.showReport = !this.showReport;
  }

  calculateResults() {
    if (!this.validateInputs()) {
      return;
    }
  
    this.loading = true;  // Activar el spinner
  
    // Realizar los cálculos
    const totalIncome = this.salary + this.extraIncome;
    const totalExpenses = Object.values(this.homeExpenses).reduce((acc, curr) => acc + curr, 0);
    this.presupuestoDisponible = totalIncome - totalExpenses;
  
    this.loading = false;  // Desactivar el spinner después de los cálculos
  }
  
}
