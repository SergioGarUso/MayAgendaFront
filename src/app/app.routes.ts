import { Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CitasComponent } from './components/citas/citas.component';
import { PanelComponent } from './components/panel/panel.component';

export const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'panel', component: PanelComponent },
  { path: '**', redirectTo: 'panel' },
];