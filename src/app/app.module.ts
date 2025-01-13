import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { AppComponent } from './app.component';  // Importa el componente principal
import { ClimaComponent } from './components/clima/clima.component'; // Asegúrate de importar tu componente

@NgModule({
  declarations: [
      // Declara el componente ClimaComponent
  ],
  imports: [
    AppComponent,    // Declara el componente AppComponent
    ClimaComponent ,
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
  ],
})
export class AppModule { }
