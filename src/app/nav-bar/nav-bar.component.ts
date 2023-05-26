import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router){}
  
  logoutPage(){
    this.openAlertLogout();
    setTimeout(() => {
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('DATA')
      this.router.navigate(['/'])
    }, 2000);
  }

  openAlertLogout(){
    let alert: any = document.getElementById("alertLogout");
    console.log(alert)
    alert.classList.remove('d-none');
  }
  // closeAlertLogout(){
  //   let alert: any = document.getElementById("alertLogout");
  //   alert.classList.add('d-none');
  // }
}
