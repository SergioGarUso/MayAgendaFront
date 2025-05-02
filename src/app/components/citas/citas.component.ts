import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.component.html',
})
export class CitasComponent {
  citas = signal<any[]>([
    { id: 1, cliente: 'Ana', fecha: '2025-04-15' },
    { id: 2, cliente: 'Bea', fecha: '2025-04-18' },
  ]);

  constructor() {
    effect(() => {
      console.log('Citas actualizadas:', this.citas());
    });
  }
}