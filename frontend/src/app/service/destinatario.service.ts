import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  endpoint: string = 'http://localhost:8080/destinatario/';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.endpoint)
      .toPromise()
      .then(res => {
        return res;
      });
  }

  find(page) {
    return this.http.get(this.endpoint + '?page=' + page)
      .toPromise()
      .then(res => {
        return res;
      });
  }

  findToMessage(page) {
    return this.http.get(this.endpoint + '?page=' + page + '&size=5')
      .toPromise()
      .then(res => {
        return res;
      });
  }

  import(fd) {
    return this.http.post(this.endpoint + 'importDestinatarios', fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  buscarPorId(id: number) {
    return this.http.get(this.endpoint + id)
      .toPromise()
      .then(resp => {
        return resp;
      });
  }
}
