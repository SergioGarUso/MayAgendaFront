import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  hoy = new Date();
  mesActual = signal(new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1));
  citas = signal<Cita[]>([]);
  modalVisible = signal(false);
  nuevaCita = signal<Cita>({
    id: 0,
    fecha: '',
    hora: '',
    cliente: '',
    servicio: ''
  });

  diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.getAll().subscribe({
      next: (data: Cita[]) => this.citas.set(data),
      error: (err: any) => console.error('Error cargando citas:', err)
    });
  }

  abrirModal(fecha: string): void {
    this.nuevaCita.set({
      id: 0,
      fecha,
      hora: '',
      cliente: '',
      servicio: ''
    });
    this.modalVisible.set(true);
  }

  guardarCita(): void {
    this.citaService.save(this.nuevaCita()).subscribe({
      next: (citaGuardada: Cita) => {
        this.citas.update(actual => [...actual, citaGuardada]);
        this.modalVisible.set(false);
      },
      error: (err: any) => console.error('Error guardando cita:', err)
    });
  }

  siguienteMes(): void {
    const actual = this.mesActual();
    this.mesActual.set(new Date(actual.getFullYear(), actual.getMonth() + 1, 1));
  }

  anteriorMes(): void {
    const actual = this.mesActual();
    this.mesActual.set(new Date(actual.getFullYear(), actual.getMonth() - 1, 1));
  }

  calendario = computed(() => {
    const mes = this.mesActual();
    const year = mes.getFullYear();
    const month = mes.getMonth();
    const primerDia = new Date(year, month, 1).getDay(); // 0 (domingo) a 6
    const diasMes = new Date(year, month + 1, 0).getDate();
    const semanas: ({ fecha: string, hoy: boolean, pasado: boolean, dia: number, citas: Cita[] } | null)[][] = [];
    let semana: ({ fecha: string, hoy: boolean, pasado: boolean, dia: number, citas: Cita[] } | null)[] = [];

    for (let i = 0; i < (primerDia === 0 ? 6 : primerDia - 1); i++) {
      semana.push(null);
    }

    for (let dia = 1; dia <= diasMes; dia++) {
      const fechaTexto = `${year}-${(month + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
      const fecha = new Date(fechaTexto);
      const esHoy = fecha.toDateString() === this.hoy.toDateString();
      const esPasado = fecha < new Date(new Date().setHours(0, 0, 0, 0));
      const citasDia = this.citas().filter(c => c.fecha === fechaTexto);

      semana.push({ fecha: fechaTexto, hoy: esHoy, pasado: esPasado, dia, citas: citasDia });

      if (semana.length === 7) {
        semanas.push(semana);
        semana = [];
      }
    }

    if (semana.length > 0) {
      while (semana.length < 7) semana.push(null);
      semanas.push(semana);
    }

    return semanas;
  });
}
