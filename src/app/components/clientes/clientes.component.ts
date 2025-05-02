import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
})
export class ClientesComponent {
  clientes = signal<any[]>([
    { id: 1, nombre: 'Ana' },
    { id: 2, nombre: 'Bea' },
  ]);

  constructor() {
    effect(() => {
      console.log('Clientes actualizados:', this.clientes());
    });
  }

  addCliente(cliente: any) {
    this.clientes.update(c => [...c, cliente]);
  }
}
