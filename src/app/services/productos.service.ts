import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductosIdxInterfaces} from "../interfaces/productos-idx.interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductosIdxInterfaces[] = [];
  productosFiltrado: ProductosIdxInterfaces[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise<void>( (resolve, reject) => {
      this.http.get('https://angular-html-ccf9b-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
        .subscribe((resp: ProductosIdxInterfaces[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    } );
  }

  getProducto(id: string){
    return this.http.get(`https://angular-html-ccf9b-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`);
  }

  buscarProducto( termino: string ) {
    if( 0 === this.productos.length ){
      this.cargarProductos().then( () => {
        this.filtrarProductos( termino );
      });
    } else {
      this.filtrarProductos(termino);
    }

  }


  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLowerCase();
      this.productosFiltrado = this.productos.filter( (producto) => {
        return ( 0 <= producto.categoria.indexOf( termino )
          || 0 <= producto.titulo.toLowerCase().indexOf( termino ) );
      });
  }
}
