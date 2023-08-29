import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginInComponent } from './views/login-in/login-in.component';
import { HomeComponent } from './views/home/home.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormBoxComponent } from './components/form-box/form-box.component';
import { RegisterInComponent } from './views/register-in/register-in.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { InputCodeComponent } from './components/input-code/input-code.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';
import { SpinnerLoaderComponent } from './components/spinner-loader/spinner-loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { RegisterCategorysComponent } from './views/register-categorys/register-categorys.component';
import { RegisterNewsComponent } from './views/register-news/register-news.component';
import { BadgeComponent } from './components/badge/badge.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { CardComponent } from './components/card/card.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { EditNewsComponent } from './views/edit-news/edit-news.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';
import { DateFormattedPipe } from './pipes/date-formatted/date-formatted.pipe';
import { ContactComponent } from './views/contact/contact.component';
import { AboutComponent } from './views/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginInComponent,
    HomeComponent,
    InputComponent,
    ButtonComponent,
    FormBoxComponent,
    RegisterInComponent,
    ForgotPasswordComponent,
    InputCodeComponent,
    InputRadioComponent,
    SpinnerLoaderComponent,
    AlertComponent,
    InputFileComponent,
    RegisterCategorysComponent,
    RegisterNewsComponent,
    BadgeComponent,
    InputSelectComponent,
    CardComponent,
    InputSearchComponent,
    EditNewsComponent,
    BackButtonComponent,
    DialogComponent,
    EditUserComponent,
    DateFormattedPipe,
    ContactComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
