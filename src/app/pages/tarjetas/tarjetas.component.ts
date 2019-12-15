import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatPaginator } from '@angular/material/paginator';
import { InfoClienteModel } from 'src/app/models/info-cliente.model';
import { InfoClientesDTO } from 'src/app/models/info.cliente.DTO';
import { ClienteModel } from '../../models/client.model';
import { stringify } from 'querystring';
import { InfoTarjetasModel } from 'src/app/models/infotarjetas.model';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['idTarjeta', 'nombre', 'apellido', 'ocupacionLaboral', 'cedula', 'ingresos', 'montoAprobado', 'cvv', 'bloqueo', 'numTarjeta', 'tipoTarjeta'];

  clienteModel: ClienteModel = new ClienteModel();
  infoTarjetasModel: InfoTarjetasModel = new InfoTarjetasModel();

  constructor( private auth: AuthService, 
               private router: Router, private clienteService: ClienteService ) { 
            this.getAllClientTarjeta();
            this.getAllClient();
  }


  consultaSol: InfoClientesDTO[] = new Array<InfoClientesDTO>();
  consultaCli: ClienteModel[] = new Array<ClienteModel>();
  dataSource = new MatTableDataSource<InfoClientesDTO>();



  ngOnInit() {

  }

  public getAllClientTarjeta() {

      this.clienteService.get('/cliente/consultar/mostrar/clientes').subscribe((respuesta: any) => {

        this.consultaSol = respuesta;
        console.log(respuesta)
        this.dataSource = new MatTableDataSource<InfoClientesDTO>(this.consultaSol);
        console.log(this.consultaSol)

      });

  }

  public getAllClient() {

    this.clienteService.get('/cliente/consultar/clientes').subscribe((respuesta: any) => {

      this.consultaCli = respuesta;

    });

}

public encontrarCliente(consultaCli: ClienteModel[]) {


  const result = consultaCli.find( ({ cedula }) => cedula === this.infoTarjetasModel.idCliente );

  console.log("hola ::::: " , result); // { name: 'cherries', quantity: 5 }
  this.clienteModel.id = result.id;
  this.clienteModel.nombre = result.nombre;
  this.clienteModel.apellido = result.apellido;
  this.clienteModel.ocupacionLaboral = result.ocupacionLaboral;
  this.clienteModel.ingresos = result.ingresos;
  this.clienteModel.cedula = result.cedula;

}


  public saveCliente() {

    this.encontrarCliente(this.consultaCli);

    console.log(this.clienteModel.nombre);
    console.log(this.clienteModel.apellido);
    console.log(this.clienteModel.ocupacionLaboral);
    console.log(this.clienteModel.ingresos);

    const object = {
      cliente: {
          id: this.clienteModel.id,
          nombre: this.clienteModel.nombre,
          apellido: this.clienteModel.apellido,
          ocupacionLaboral: this.clienteModel.ocupacionLaboral,
          ingresos: this.clienteModel.ingresos,
          cedula: this.clienteModel.cedula
      },
      informacionTarjeta: {
          id: this.infoTarjetasModel.id,
          idCliente: this.clienteModel.cedula,
          montoAprobado: this.infoTarjetasModel.montoAprobado,
          cvv: this.infoTarjetasModel.cvv,
          bloqueo: this.infoTarjetasModel.bloqueo,
          numTarjeta: this.infoTarjetasModel.numTarjeta,
          tipoTarjeta: this.infoTarjetasModel.tipoTarjeta
      }
  };

  console.log("linea numero 113 ::::: " + JSON.stringify(object))

    this.clienteService.post('/cliente/save', object).subscribe(
      (respuesta: any) => {
          console.log(JSON.stringify(respuesta));
          this.getAllClientTarjeta();
      }
    );

  }

}
