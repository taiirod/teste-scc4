import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinatariosComponent } from './components/destinatarios/destinatarios.component';
import {HttpClientModule} from '@angular/common/http';
import { RemetentesComponent } from './components/remetentes/remetentes.component';
import { HeaderComponent } from './components/header/header.component';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import { RemetenteFormComponent } from './components/remetentes/remetente-form/remetente-form.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';
import { RemetenteDetalheComponent } from './components/remetentes/remetente-detalhe/remetente-detalhe.component';
import { DestinatarioDetalheComponent } from './components/destinatarios/destinatario-detalhe/destinatario-detalhe.component';
import { MensagemComponent } from './components/mensagem/mensagem.component';
import {NgxPaginationModule} from 'ngx-pagination';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    AppComponent,
    DestinatariosComponent,
    RemetentesComponent,
    HeaderComponent,
    RemetenteFormComponent,
    RemetenteDetalheComponent,
    DestinatarioDetalheComponent,
    MensagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    NgxMaskModule.forRoot(options),
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
