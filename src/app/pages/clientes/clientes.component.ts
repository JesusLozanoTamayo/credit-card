import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/client.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'ocupacion', 'ingresos'];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator ) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private auth: AuthService,
               private router: Router, private clienteService: ClienteService ) { }

  cliente: Cliente;

  ngOnInit() {
  this.getClientId();
  }



  public getClientId() {

      this.clienteService.getClientId('1', '1').subscribe((respuesta: any) => {
                  console.log(JSON.stringify(respuesta));
                  const info = respuesta;
                  this.dataSource = new MatTableDataSource(info);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
      });

  }


}
