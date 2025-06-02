import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService, Cita } from '../../services/cita.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  private citaService = inject(CitaService);

  hoy = new Date();
  mesActual = signal(new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1));

  citas = signal<Cita[]>([]);
  modalVisible = signal(false);
  nuevaCita = signal<Cita>({
    fecha: '',
    hora: '',
    cliente: '',
    servicio: '',
    usuario: { id: 1 } // ← puedes ajustar el ID real
  } as any);

  constructor() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService.getCitas().subscribe(data => this.citas.set(data));
  }

  abrirModal(fecha: string) {
    this.nuevaCita.set({ fecha, hora: '', cliente: '', servicio: '', usuario: { id: 1 } } as any);
    this.modalVisible.set(true);
  }

  guardarCita() {
    this.citaService.crearCita(this.nuevaCita()).subscribe(() => {
      this.cargarCitas();
      this.modalVisible.set(false);
    });
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
    // (dejas el resto de la lógica igual)
  });
}
