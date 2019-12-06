import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../service/header.service';
import {Remetente} from '../../model/remetente';
import {RemetenteService} from '../../service/remetente.service';
import {Destinatario} from '../../model/destinatario';
import {DestinatarioService} from '../../service/destinatario.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {Mensagem} from '../../model/mensagem';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  mensagem = new Mensagem();
  remetentes: Remetente[];
  destinatarios: Destinatario[];
  actualPage: number = 0;
  totalDestinatarios: number;
  destinatariosSelecionados: Destinatario[] = [];

  constructor(private headerService: HeaderService,
              private remetenteService: RemetenteService,
              private destinatarioService: DestinatarioService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.headerService.changeTitleName('Mensagem');
    this.getAllRemetentes();
    this.getAllDestinatarios();
  }

  getAllRemetentes() {
    this.remetenteService.getAll().then(
      (resp: Remetente[]) => {
        this.remetentes = resp;
        return this.remetentes;
      });
  }

  getAllDestinatarios() {
    // @ts-ignore
    this.destinatarioService.findToMessage()
      .then((resp: Destinatario[]) => {
        // @ts-ignore
        this.destinatarios = resp.content;
        // @ts-ignore
        this.totalDestinatarios = resp.totalElements;
        this.spinner.hide();
      });
  }

  findDestinatarios(event) {
    this.actualPage = event;
    this.destinatarioService.findToMessage(event)
      .then(resp => {
        // @ts-ignore
        this.destinatarios = resp.content;
      });
  }

  enviarMensagem(mensagem: NgForm) {
    if (!mensagem.valid) {
      this.toastr.warning('Campos obrigatórios não preenchidos', 'Atenção');
    } else {
      this.destinatariosSelecionados.forEach(
        resp => {
          console.log(mensagem.value.remetente + ' enviou mensagem: ' + mensagem.value.mensagem + ' para ' + resp.nome);
          this.toastr.success('Mensagem enviada', 'Sucesso!');

        });
    }
  }

  selecionarDestinatario(destinatario) {
    this.destinatariosSelecionados.push(destinatario);
  }
}
