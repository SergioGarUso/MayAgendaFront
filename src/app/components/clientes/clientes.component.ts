import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes = signal<Cliente[]>([
    { id: 1, nombre: 'Ana López', telefono: '600123123', email: 'ana@gmail.com' },
    { id: 2, nombre: 'Bea Torres', telefono: '611456456', email: 'bea@gmail.com' }
  ]);

  modalVisible = signal(false);
  modalCliente = signal<Cliente | null>(null);

  openModal(cliente: Cliente | null = null) {
    this.modalCliente.set(cliente ? { ...cliente } : { id: 0, nombre: '', telefono: '', email: '' });
    this.modalVisible.set(true);
  }

  closeModal() {
    this.modalVisible.set(false);
  }

  guardarCliente() {
    const nuevo = this.modalCliente()!;
    if (nuevo.id === 0) {
      const nuevoId = Math.max(...this.clientes().map(c => c.id), 0) + 1;
      this.clientes.update(c => [...c, { ...nuevo, id: nuevoId }]);
    } else {
      this.clientes.update(c => c.map(cli => cli.id === nuevo.id ? nuevo : cli));
    }
    this.closeModal();
  }

  eliminarCliente(id: number) {
    this.clientes.update(c => c.filter(cli => cli.id !== id));
  }
}
