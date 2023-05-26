import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreatePersonComponent } from './create-person/create-person.component';
import { ViewPersonComponent } from './view-person/view-person.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'create-person', component:CreatePersonComponent},
  { path: 'view-person', component:ViewPersonComponent} 
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
