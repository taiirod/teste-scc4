import {Remetente} from './remetente';
import {Destinatario} from './destinatario';

export class Mensagem {

  id: number;
  remetente: Remetente;
  destinatarios: Destinatario[];
  mensagem: string;

}
