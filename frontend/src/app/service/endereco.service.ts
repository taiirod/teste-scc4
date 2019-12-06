import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  endpoint = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  buscarEndereco(cep: string) {
    return this.http.get(this.endpoint + cep + '/json/')
      .toPromise()
      .then(endereco => {
      return endereco;
    });
  }
}
