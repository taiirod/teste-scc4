import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RemetenteService} from '../../../service/remetente.service';
import {Remetente} from '../../../model/remetente';
import {HeaderService} from '../../../service/header.service';
import {NgForm} from '@angular/forms';
import {Endereco} from '../../../model/endereco';
import {EnderecoService} from '../../../service/endereco.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Destinatario} from '../../../model/destinatario';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
    selector: 'app-remetente-detalhe',
    templateUrl: './remetente-detalhe.component.html',
    styleUrls: ['./remetente-detalhe.component.css']
})
export class RemetenteDetalheComponent implements OnInit {

    remetente = new Remetente();
    endereco = new Endereco();
    idRemetente: number;
    message: null;
    remetentes: Remetente[];

    constructor(private remetenteService: RemetenteService,
                private route: ActivatedRoute,
                private router: Router,
                private headerService: HeaderService,
                private enderecoService: EnderecoService,
                private toastr: ToastrService,
                private modalService: NgbModal,
                private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.pegarId();
        this.buscarPorId();
        this.headerService.changeTitleName('Detalhe Remetente');
    }

    pegarId() {
        this.route.params.subscribe(id => {
            this.idRemetente = id.id;
        });
    }

    buscarPorId() {
        this.remetenteService.buscarPorId(this.idRemetente)
            .then((remetente: Remetente) => {
                this.remetente = remetente;
                return this.remetente;
            });
    }

    voltar() {
        this.router.navigate(['/remetente']);
    }

    editarRemetente(remetenteForm: NgForm) {
        this.remetente.nome = remetenteForm.value.nome;
        this.remetente.cpf = remetenteForm.value.cpf;
        this.remetente.telefone = remetenteForm.value.telefone;
        this.remetente.email = remetenteForm.value.email;

        if (remetenteForm.valid) {
            this.remetenteService.update(this.remetente.id, this.remetente)
                .subscribe(resp => {
                    if (resp != null) {
                        this.modalService.dismissAll();
                        this.toastr.success('Remetente Adicionado', 'Sucesso!');
                        this.router.navigate(['/remetente/' + this.remetente.id]);
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

    abrirModalEditar(editarModal) {
        this.message = null;
        const modal = this.modalService.open(editarModal, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg'
        });
        modal.result.then(() => {
        }, () => {
            console.log(this.buscarPorId());
        });
    }
    closeModal() {
        this.modalService.dismissAll();
    }

    deletar(id: number) {
        this.remetenteService.delete(id).subscribe(resp => {
            console.log(resp);
            if (resp === 200) {
                this.toastr.success('Remetente apagado', 'Sucesso!');
                this.router.navigate(['/remetente']);
            } else {
                this.toastr.error('Erro ao apagar remetente', 'Erro!');
            }
        });
    }
}
