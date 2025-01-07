import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

export interface AhorroInversion {
    ahorro: number;
    inversion: number;
  }
  @Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css']
  })

  export class CalculatorComponent {
    salarioMensual: number = 0;
    ingresosAdicionales: number = 0;
  
    gastosHogar = {
      hipotecaAlquiler: 0,
      seguroHogar: 0,
      mantenimientoCasa: 0,
      internet: 0,
      telefono: 0,
      comida: 0
    };
  
    gastosTransporte = {
      coche: 0,
      seguroCoche: 0,
      mantenimientoCoche: 0,
      combustible: 0,
      transportePublico: 0,
      taxiUber: 0
    };
  
    gastosEducacion = {
      colegio: 0,
      extraescolares: 0,
      materialEscolar: 0
    };
  
    otrosGastos = {
      ocio: 0,
      vacaciones: 0,
      medico: 0,
      mascotas: 0,
      otros: 0
    };
  
    ahorroInversion: AhorroInversion = {
      ahorro: 0,
      inversion: 0
    };
  
    totalIngresos: number = 0;
    totalGastos: number = 0;
    totalAhorro: number = 0;
  
    calculateResults() {
      this.totalIngresos = this.salarioMensual + this.ingresosAdicionales;
      this.totalGastos = 
        this.calculateTotal(this.gastosHogar) + 
        this.calculateTotal(this.gastosTransporte) + 
        this.calculateTotal(this.gastosEducacion) + 
        this.calculateTotal(this.otrosGastos);
      this.totalAhorro = this.ahorroInversion.ahorro + this.ahorroInversion.inversion;
    }
  
    calculateTotal(expenses: { [key: string]: number }): number {
      return Object.values(expenses).reduce((sum, value) => sum + value, 0);
    }
  
    reset() {
      this.salarioMensual = 0;
      this.ingresosAdicionales = 0;
      this.gastosHogar = { hipotecaAlquiler: 0, seguroHogar: 0, mantenimientoCasa: 0, internet: 0, telefono: 0, comida: 0 };
      this.gastosTransporte = { coche: 0, seguroCoche: 0, mantenimientoCoche: 0, combustible: 0, transportePublico: 0, taxiUber: 0 };
      this.gastosEducacion = { colegio: 0, extraescolares: 0, materialEscolar: 0 };
      this.otrosGastos = { ocio: 0, vacaciones: 0, medico: 0, mascotas: 0, otros: 0 };
      this.ahorroInversion = { ahorro: 0, inversion: 0 };
      this.totalIngresos = 0;
      this.totalGastos = 0;
      this.totalAhorro = 0;
    }
  }
  