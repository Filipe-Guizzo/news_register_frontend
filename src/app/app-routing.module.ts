import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginInComponent } from './views/login-in/login-in.component';
import { RegisterInComponent } from './views/register-in/register-in.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { RegisterCategorysComponent } from './views/register-categorys/register-categorys.component';
import { RegisterNewsComponent } from './views/register-news/register-news.component';
import { EditNewsComponent } from './views/edit-news/edit-news.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'login-in', component: LoginInComponent, canActivate:[NoAuthGuard]},
  {path: 'register-in', component: RegisterInComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'register-categorys', component: RegisterCategorysComponent, canActivate:[AuthGuard]},
  {path: 'register-news', component: RegisterNewsComponent, canActivate:[AuthGuard]},
  {path: 'edit-news/:id', component: EditNewsComponent, canActivate:[AuthGuard]},
  {path: 'account', component: EditUserComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: '/login-in'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
