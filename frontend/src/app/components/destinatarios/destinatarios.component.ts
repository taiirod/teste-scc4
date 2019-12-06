import {Component, OnInit} from '@angular/core';
import {Destinatario} from '../../model/destinatario';
import {HeaderService} from '../../service/header.service';
import {DestinatarioService} from '../../service/destinatario.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpEventType} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-destinatarios',
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.css']
})
export class DestinatariosComponent implements OnInit {

  destinatarios: Destinatario[];
  arquivoSelecionado: File = null;
  progress: number;
  message: string = null;
  totalDestinatarios: number;
  actualPage: number = 0;

  constructor(private destinatarioService: DestinatarioService,
              private headerService: HeaderService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.headerService.changeTitleName('Destinatários');
    this.getAll();
  }

  getAll() {
    this.destinatarioService.getAll()
      .then((resp: Destinatario[]) => {
        // @ts-ignore
        this.destinatarios = resp.content;
        // @ts-ignore
        this.totalDestinatarios = resp.totalElements;
        this.spinner.hide();
      });
  }

  find(event) {
    console.log(event);
    this.actualPage = event;
    this.destinatarioService.find(event)
      .then(resp => {
        // @ts-ignore
        this.destinatarios = resp.content;
      });
  }

  abrirModalDestinatario(importDestinatarioModal) {
    this.message = null;
    const modal = this.modalService.open(importDestinatarioModal, {ariaLabelledBy: 'modal-basic-title'});
    modal.result.then(() => {
    }, () => {
      this.getAll();
    });
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.arquivoSelecionado = event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.arquivoSelecionado, this.arquivoSelecionado.name);
    this.destinatarioService.import(fd).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
        this.message = 'Importando ...';
        this.spinner.show();
      } else if (event.type === HttpEventType.Response) {
        this.spinner.hide();
        this.modalService.dismissAll();
        this.toastr.success('Destinatários importados com sucesso!', 'Sucesso!');
      }
    });
  }
}
