import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  citasHoy = signal([
    { hora: '10:00', cliente: 'Ana López', servicio: 'Cejas' },
    { hora: '12:30', cliente: 'Bea Torres', servicio: 'Labios' },
    { hora: '17:00', cliente: 'Carla Ruiz', servicio: 'Retoque eyeliner' }
  ]);

  // En el futuro se puede sustituir por un servicio:
  // this.servicioCitas.getCitasHoy().subscribe(data => this.citasHoy.set(data))
}
