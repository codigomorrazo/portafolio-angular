import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductosService} from "../../services/productos.service";
import ProductoDescripcionInterface from "../../interfaces/producto-descripcion.interfaces";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  cargando = true;
  producto: ProductoDescripcionInterface;
  id: string;

  constructor(private route: ActivatedRoute, public productoService: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parametros => {
      this.productoService.getProducto( parametros.id )
        .subscribe((producto: ProductoDescripcionInterface) => {
          this.id = parametros.id;
          this.producto = producto;

          this.cargando = false;
        });
    });
  }

}
