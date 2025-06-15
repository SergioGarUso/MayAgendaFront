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

  modoMock = true; // ← cambia esto a false cuando la API esté funcionando

  constructor() {
    if (this.modoMock) {
      this.clientes.set([
        { id: 1, nombre: 'Laura López', telefono: '678123456', email: 'laura@email.com' },
        { id: 2, nombre: 'Carmen Ruiz', telefono: '666987654', email: 'carmen@email.com' },
        { id: 3, nombre: 'Ana Torres', telefono: '679112233', email: 'ana@email.com' },
      ]);
    } else {
      this.cargarClientes();
    }
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
