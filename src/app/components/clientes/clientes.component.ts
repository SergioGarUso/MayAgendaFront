import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService, Cliente } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  private clienteService = inject(ClienteService);

  clientes = signal<Cliente[]>([]);
  modalVisible = signal(false);
  modalCliente = signal<Cliente | null>(null);

  constructor() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe(data => this.clientes.set(data));
  }

  openModal(cliente: Cliente | null = null) {
    this.modalCliente.set(cliente ? { ...cliente } : { nombre: '', telefono: '', email: '' });
    this.modalVisible.set(true);
  }

  closeModal() {
    this.modalVisible.set(false);
  }

  guardarCliente() {
    const cliente = this.modalCliente()!;
    this.clienteService.crearCliente(cliente).subscribe(() => {
      this.cargarClientes();
      this.closeModal();
    });
  }

  eliminarCliente(id?: number) {
    this.clientes.update(c => c.filter(cli => cli.id !== id));
  }
}
