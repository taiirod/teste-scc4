import {Component, OnInit} from '@angular/core';
import {Destinatario} from '../../../model/destinatario';
import {DestinatarioService} from '../../../service/destinatario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from '../../../service/header.service';
import {Remetente} from '../../../model/remetente';

@Component({
  selector: 'app-destinatario-detalhe',
  templateUrl: './destinatario-detalhe.component.html',
  styleUrls: ['./destinatario-detalhe.component.css']
})
export class DestinatarioDetalheComponent implements OnInit {

  destinatario = new Destinatario();
  idDestinatario: number;

  constructor(private destinatarioService: DestinatarioService,
              private route: ActivatedRoute,
              private router: Router,
              private  headerService: HeaderService) {
  }

  ngOnInit() {
    this.pegaId();
    this.buscarPorId();
    this.headerService.changeTitleName('Detalhe Destinatário');
  }

  pegaId() {
    this.route.params.subscribe(id => {
      this.idDestinatario = id.id;
    });
  }

  buscarPorId() {
    this.destinatarioService.buscarPorId(this.idDestinatario)
      .then((destinatario: Destinatario) => {
        this.destinatario = destinatario;
        return this.destinatario;
      });
  }

  voltar() {
    this.router.navigate(['/destinatario']);
  }
}
