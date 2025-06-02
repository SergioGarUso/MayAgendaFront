import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cita {
  fecha: string; // YYYY-MM-DD
  hora: string;
  cliente: string;
  servicio: string;
}

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  hoy = new Date();
  mesActual = signal(new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1));

  citas = signal<Cita[]>([
    { fecha: '2025-06-03', hora: '10:00', cliente: 'Ana', servicio: 'Cejas' },
    { fecha: '2025-06-03', hora: '12:30', cliente: 'Bea', servicio: 'Labios' },
    { fecha: '2025-06-04', hora: '09:00', cliente: 'Carla', servicio: 'Eyeliner' }
  ]);

  modalVisible = signal(false);
  nuevaCita = signal<Cita>({
    fecha: '',
    hora: '',
    cliente: '',
    servicio: ''
  });

  abrirModal(fecha: string) {
    this.nuevaCita.set({ fecha, hora: '', cliente: '', servicio: '' });
    this.modalVisible.set(true);
  }

  guardarCita() {
    this.citas.update(c => [...c, this.nuevaCita()]);
    this.modalVisible.set(false);
  }

  siguienteMes() {
    const actual = this.mesActual();
    this.mesActual.set(new Date(actual.getFullYear(), actual.getMonth() + 1, 1));
  }

  anteriorMes() {
    const actual = this.mesActual();
    this.mesActual.set(new Date(actual.getFullYear(), actual.getMonth() - 1, 1));
  }

  calendario = computed(() => {
    const mes = this.mesActual();
    const year = mes.getFullYear();
    const month = mes.getMonth();
    const primerDia = new Date(year, month, 1).getDay(); // 0 (domingo) a 6
    const diasMes = new Date(year, month + 1, 0).getDate();
    const semanas: { fecha: string, hoy: boolean, pasado: boolean, dia: number, citas: Cita[] }[][] = [];
    let semana: any[] = [];

    // Rellenar días en blanco hasta primer día del mes
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

    // Rellenar últimos días en blanco
    if (semana.length > 0) {
      while (semana.length < 7) semana.push(null);
      semanas.push(semana);
    }

    return semanas;
  });

  diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
}
