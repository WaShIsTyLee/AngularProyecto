import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiKey: string = 'eb1b04719b936f171599b4730cb19743';  // Tu clave de API
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor() {}

  // Método para obtener el clima de una ciudad
  obtenerClima(ciudad: string): Promise<any> {
    const url = `${this.apiUrl}?q=${ciudad}&appid=${this.apiKey}&units=metric&lang=es`;
    
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del clima');
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}
