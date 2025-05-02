import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel.component.html',
})
export class PanelComponent {
  resumen = signal([
    { tipo: 'Citas esta semana', cantidad: 5 },
    { tipo: 'Clientes activos', cantidad: 12 },
  ]);
}
