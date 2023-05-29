import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import validateToken from '../middleware/validateToken';

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
  token:string = ""

  ngOnInit() :void {
    this.forModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );

    this.token = localStorage.getItem('TOKEN') || "";

    validateToken(this.router);
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
    validateToken(this.router);
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
          'Authorization': `${this.token}`
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
