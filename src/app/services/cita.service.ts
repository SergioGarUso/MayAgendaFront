import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  id?: number;
  fecha: string;
  hora: string;
  cliente?: string;
  servicio?: string;
  usuario: {
    id: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://54.235.60.223:8080/api/citas';

  constructor(private http: HttpClient) {}

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  crearCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }
}
