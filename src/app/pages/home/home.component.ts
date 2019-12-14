import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private auth: AuthService,
               private router: Router, private clienteService: ClienteService ) { }

  ngOnInit() {
    this.getClientId();
  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }


  public getClientId() {

    this.clienteService.getClientId('1', '').subscribe((res: any) => {
        console.log(JSON.stringify(res));
    });

  }


}
