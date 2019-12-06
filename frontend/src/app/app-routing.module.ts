import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DestinatariosComponent} from './components/destinatarios/destinatarios.component';
import {RemetentesComponent} from './components/remetentes/remetentes.component';
import {RemetenteFormComponent} from './components/remetentes/remetente-form/remetente-form.component';
import {RemetenteDetalheComponent} from './components/remetentes/remetente-detalhe/remetente-detalhe.component';
import {DestinatarioDetalheComponent} from './components/destinatarios/destinatario-detalhe/destinatario-detalhe.component';
import {MensagemComponent} from './components/mensagem/mensagem.component';


const routes: Routes = [
  {
    path: 'mensagem',
    component: MensagemComponent
  },
  {
    path: 'destinatario',
    component: DestinatariosComponent
  },
  {
    path: 'destinatario/:id',
    component: DestinatarioDetalheComponent
  },
  {
    path: 'remetente',
    component: RemetentesComponent
  },
  {
    path: 'remetente/novo',
    component: RemetenteFormComponent
  },
  {
    path: 'remetente/:id',
    component: RemetenteDetalheComponent
  },
  {
    path: 'remetente',
    component: RemetentesComponent
  },
  {
    path: '**',
    redirectTo: 'mensagem'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
