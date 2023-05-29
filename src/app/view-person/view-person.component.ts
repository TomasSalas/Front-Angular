import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import validateToken from '../middleware/validateToken';


declare var window:any;

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.css']
})


export class ViewPersonComponent implements OnInit {
  token:string = "";
  
  constructor(private router: Router) { }
  ngOnInit() :void {

    validateToken(this.router)

    this.forModal = new window.bootstrap.Modal(
      document.getElementById('modalEdit')
    );

    this.token = localStorage.getItem('TOKEN') || "";
    this.viewUser();
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
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`
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

  btnDelete(data:any){
    swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.value) {
        const url = 'http://localhost:3000/deleteUser'
        const token:any = localStorage.getItem('TOKEN');
        
        swal.fire({
          icon: 'success',
          title: 'Usuario eliminado',
          text: 'Usuario eliminado correctamente!',
        });
        
      }
    });
    console.log(data)
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
