import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var window:any;

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})

export class CreatePersonComponent implements OnInit {
  
  constructor(
    private router: Router
  ) { }

  forModal:any;
  titulo: string = "Create Person";
  name: string = ""
  lastname: string = ""
  email: string = ""
  password: string = ""
  msgAlert: string = ""
  
  ngOnInit() :void {
    this.forModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
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
    
  }

  openModal(){
    this.forModal.show()
  }

  closeModal(){
    this.forModal.hide()
  }

  openCorrect(){
    let alert: any = document.getElementById("alertCorrect");
    alert.classList.remove('d-none');
  }

  closeCorrect(){
    let alert: any = document.getElementById("alertCorrect");
    alert.classList.add('d-none');
  }

  async savePerson(){
    const token:any = localStorage.getItem('TOKEN');
    
    const data = {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    }
    const url = 'http://localhost:3000/createUser'

    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if(result.Error == null){
        this.msgAlert = "La creación del usuario fue exitosa ✅";
        this.openCorrect()
        this.name = "",
        this.lastname = "",
        this.email = "",
        this.password = ""

        setTimeout(() => {
          this.closeCorrect()
        }, 2000)
        
      }else{
        this.openCorrect()
        this.msgAlert = "Error en la creación del usuario ❌";
        this.name = "",
        this.lastname = "",
        this.email = "",
        this.password = ""

        setTimeout(() => {
          this.closeCorrect()
        }, 2000)
      }
    }catch(err){
      console.log(err)
    }
  }
}
