import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar *ngIf
import { ClimaService } from '../../services/clima.service';

@Component({
  selector: 'app-clima',
  standalone: true,  // Marca el componente como independiente
  imports: [CommonModule],  // Asegúrate de importar CommonModule
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {
  ciudad: string = 'Madrid';  // Ciudad por defecto
  clima: any;
  error: string = '';
  loading: boolean = false;  // Variable para controlar el spinner

  constructor(private climaService: ClimaService) {}

  ngOnInit(): void {
    this.obtenerClima();
  }

  // Método para obtener el clima
  obtenerClima(): void {
    this.loading = true;  // Inicia el spinner
    this.climaService.obtenerClima(this.ciudad)
      .then(data => {
        this.clima = data;
        this.error = '';  // Limpiar cualquier error previo
      })
      .catch(err => {
        this.error = 'No se pudo obtener el clima. Intenta nuevamente.';
        console.error(err);
      })
      .finally(() => {
        this.loading = false;  // Detiene el spinner
      });
  }
}
