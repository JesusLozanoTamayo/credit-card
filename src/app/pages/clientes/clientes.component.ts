import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClienteModel } from '../../models/client.model';
import { InfoClienteModel } from 'src/app/models/info-cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  CLIENTE_DATA: ClienteModel[];

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'ocupacion', 'ingresos'];
  dataSource = new MatTableDataSource<ClienteModel>(this.CLIENTE_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private auth: AuthService,
               private router: Router, private clienteService: ClienteService ) { }


  ngOnInit() {
  this.getClientId();
  }



  public getClientId() {

      this.clienteService.getClientId('1').subscribe((respuesta: any) => {

                  const info = respuesta;
                  this.CLIENTE_DATA = respuesta.cliente;
                  console.log(JSON.stringify(this.CLIENTE_DATA));

      });

  }


}


export interface PeriodicElement {
  CLIENTE_DATA: ClienteModel;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {"id":1, "nombre":"2","apellido":"2","ocupacionLaboral":"2","ingresos":2}];
