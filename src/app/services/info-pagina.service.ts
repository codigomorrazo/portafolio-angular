import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {InfoPagina} from "../interfaces/info-pagina.interfaces";
import {InfoFirebaseInterfaces} from "../interfaces/info-firebase.interfaces";

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: InfoFirebaseInterfaces[] = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo(){

    this.http.get('https://angular-html-ccf9b-default-rtdb.europe-west1.firebasedatabase.app/equipo.json')
      .subscribe((respuestaEquipo: InfoFirebaseInterfaces[]) => {
        this.equipo = respuestaEquipo;
      })
  }
}
