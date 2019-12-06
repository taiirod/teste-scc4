import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Remetente} from '../../../model/remetente';
import {HeaderService} from '../../../service/header.service';
import {Endereco} from '../../../model/endereco';
import {EnderecoService} from '../../../service/endereco.service';
import {RemetenteService} from '../../../service/remetente.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-remetente-form',
  templateUrl: './remetente-form.component.html',
  styleUrls: ['./remetente-form.component.css']
})
export class RemetenteFormComponent implements OnInit {


  remetente = new Remetente();
  endereco = new Endereco();

  constructor(private headerService: HeaderService,
              private enderecoService: EnderecoService,
              private remetenteService: RemetenteService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    this.headerService.changeTitleName('Novo Remetente');
  }

  novoRemetente(remetenteForm: NgForm) {
    this.remetente.nome = remetenteForm.value.nome;
    this.remetente.cpf = remetenteForm.value.cpf;
    this.remetente.telefone = remetenteForm.value.telefone;
    this.remetente.email = remetenteForm.value.email;

    if (remetenteForm.valid) {
      this.remetenteService.add(this.remetente)
        .subscribe(resp => {
          if (resp != null) {
            this.toastr.success('Remetente Adicionado', 'Sucesso!');
            this.router.navigate(['/remetente']);
          }
        }, err => {
          this.toastr.error('Erro ao adicionar remetente', 'Erro!');
        });
    } else {
      this.toastr.warning('Campos obrigatórios não preenchidos', 'Atenção!');
    }
  }

  buscarPorCep(remetenteForm: NgForm) {
    const cep = remetenteForm.value.cep;
    if (cep.length >= 8) {
      this.enderecoService.buscarEndereco(cep)
        .then((endereco: Endereco) => {
          if (endereco.erro) {
            this.toastr.error('CEP não encontrado', 'Erro!');
          } else {
            this.toastr.success('CEP encontrado', 'Sucesso!');
            this.endereco.cep = endereco.cep;
            this.endereco.logradouro = endereco.logradouro;
            this.endereco.numero = endereco.numero;
            this.endereco.complemento = endereco.complemento;
            this.endereco.localidade = endereco.localidade;
            this.endereco.bairro = endereco.bairro;
            this.endereco.uf = endereco.uf;

            this.remetente.endereco = this.endereco;

          }
        });
    }
  }

  voltar() {
    this.router.navigate(['/remetente']);
  }
}
