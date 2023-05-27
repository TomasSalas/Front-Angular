import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {

  constructor(
    private httpClient: HttpClient, 
    private router: Router
  ) { }

  forModal:any;
  titulo = "Inicio de sesión"
  email: string = ""
  password: string = ""

  ngOnInit(): void {
    const token: any = localStorage.getItem('TOKEN');
    if (token === null) {
      this.router.navigate(['/'])
    }else{
      function wt_decode(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      };
  
      const decode = wt_decode(token)
      let dateExp = new Date(decode.exp * 1000).toLocaleString();
      let date = new Date().toLocaleString()
  
      if (date < dateExp) {
        this.router.navigate(['/create-person'])
      }
    }
  }

  loginLocal() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.httpClient.post<any>('http://localhost:3000/signin', data).subscribe(response => {
      if (response.error == null) {
        this.openCorrect();
        setTimeout(() => {
          //this.closeAlert();
          localStorage.setItem('TOKEN', response.token);
          localStorage.setItem('DATA', JSON.stringify(response.data));
          this.router.navigate(['/create-person'])
        },1000);
      } else {
        this.openAlert();
        setTimeout(() => {
          this.closeAlert();
        }, 3000);
        this.email = ""
        this.password = ""
      }
    })
  };

  closeAlert(){
    let alert: any = document.getElementById("alertOK");
    alert.classList.add('d-none');
  }

  openAlert(){
    let alert: any = document.getElementById("alertOK");
    alert.classList.remove('d-none');
  }

  openCorrect(){
    let alert: any = document.getElementById("alertCorrect");
    alert.classList.remove('d-none');
  }
  closeCorrect(){
    let alert: any = document.getElementById("alertCorrect");
    alert.classList.add('d-none');
  }
}
