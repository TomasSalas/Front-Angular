import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var window:any;

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.css']
})


export class ViewPersonComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit() :void {

    this.forModal = new window.bootstrap.Modal(
      document.getElementById('modalEdit')
    );

    const token: any = localStorage.getItem('TOKEN');
    if(token === null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor vuelva a iniciar sesión',
      });
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
  
      if (date > dateExp) {
        Swal.fire({
          icon: 'info',
          title: 'Sesión expirada',
          text: 'Por favor vuelva a iniciar sesión',
        }).then(() => {
          localStorage.removeItem('TOKEN')
          localStorage.removeItem('DATA')
          this.router.navigate(['/'])
        })
        
      }
    }
    
    this.viewUser()
  }

  datos:any[] = [];
  forModal:any;
  name:string = ""
  lastname:string = ""
  email:string = ""
  password:string = ""
  msgAlert:string = ""

  async viewUser(){
    const url = 'http://localhost:3000/viewUsers'
    const token:any = localStorage.getItem('TOKEN');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    });

    const result = await response.json();
    this.datos = result.data;
  }

  btnEdit(data:any){
    this.name = data.dato.name;
    this.lastname = data.dato.lastname;
    this.email = data.dato.email;
    this.openModal()
  }

  btnDelete(){
    console.log("Delete")
  }

  openModal(){
    this.forModal.show()
  }

  closeModal(){
    this.forModal.hide()
  }

  btnEditUser(){
    console.log(this.name)
  }
}
