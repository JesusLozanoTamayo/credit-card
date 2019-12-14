import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatPaginator } from '@angular/material/paginator';
import { InfoClienteModel } from 'src/app/models/info-cliente.model';
import { InfoClientesDTO } from 'src/app/models/info.cliente.DTO';
import { ClienteModel } from '../../models/client.model';
import { stringify } from 'querystring';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'ocupacionLaboral', 'cedula', 'ingresos'];

  clienteModel: ClienteModel = new ClienteModel();

  constructor( private auth: AuthService, 
               private router: Router, private clienteService: ClienteService ) { this.getAllClient();
  }


  consultaSol: ClienteModel[] = new Array<ClienteModel>();
  dataSource = new MatTableDataSource<ClienteModel>();



  ngOnInit() {

  }

  public getAllClient() {

      this.clienteService.get('/cliente/consultar/clientes').subscribe((respuesta: any) => {

        this.consultaSol = respuesta;
        this.dataSource = new MatTableDataSource<ClienteModel>(this.consultaSol);

      });

  }


  public saveCliente() {
    console.log(this.clienteModel.nombre);
    console.log(this.clienteModel.apellido);
    console.log(this.clienteModel.ocupacionLaboral);
    console.log(this.clienteModel.ingresos);

    const object = {

        nombre: this.clienteModel.nombre,
        apellido: this.clienteModel.apellido,
        ocupacionLaboral: this.clienteModel.ocupacionLaboral,
        ingresos: this.clienteModel.ingresos,
        cedula: this.clienteModel.cedula

  };
  console.log(JSON.stringify(object));
    this.clienteService.post('/cliente/save-cliente', object).subscribe(
      (respuesta: any) => {
          console.log(JSON.stringify(respuesta));
          this.getAllClient();
      }
    );

  }


}
