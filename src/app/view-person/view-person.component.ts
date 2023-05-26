import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.css']
})
export class ViewPersonComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit() :void {
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
}
