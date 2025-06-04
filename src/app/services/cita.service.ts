import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  id?: number;             // opcional porque lo genera el backend
  fecha: string;
  hora: string;
  cliente: string;
  servicio: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiURL = 'http://54.235.60.223:8080/api/citas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiURL);
  }

  save(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiURL, cita);
  }
}
