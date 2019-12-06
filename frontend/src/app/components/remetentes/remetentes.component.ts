import {Component, OnInit} from '@angular/core';
import {Remetente} from '../../model/remetente';
import {HeaderService} from '../../service/header.service';
import {RemetenteService} from '../../service/remetente.service';

@Component({
  selector: 'app-remetentes',
  templateUrl: './remetentes.component.html',
  styleUrls: ['./remetentes.component.css']
})
export class RemetentesComponent implements OnInit {

  remetentes: Remetente[];

  constructor(private remetenteService: RemetenteService,
              private headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.changeTitleName('Remetentes');
    this.getAll();
  }

  getAll() {
    this.remetenteService.getAll().then(
      (resp: Remetente[]) => {
        this.remetentes = resp;
        return this.remetentes;
      });
  }

}
