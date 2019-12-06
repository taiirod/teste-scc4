import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Remetente} from '../model/remetente';

@Injectable({
  providedIn: 'root'
})
export class RemetenteService {

  endpoint: string = 'http://localhost:8080/remetente/';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.endpoint)
      .toPromise()
      .then(res => {
        return res;
      });
  }

  add(remetente: Remetente) {
    return this.http.post(this.endpoint, remetente);
  }

  update(id: number, remetente: Remetente) {
    return this.http.put(this.endpoint + id, remetente);
  }

  delete(id: number) {
    return this.http.delete(this.endpoint + id);
  }

  buscarPorId(id: number) {
    return this.http.get(this.endpoint + id)
      .toPromise()
      .then(resp => {
        return resp;
      });
  }
}
