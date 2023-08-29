import { Component, Input } from '@angular/core';
import { FormBoxLinks } from './interfaces/form-box';

@Component({
  selector: 'app-form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.css']
})
export class FormBoxComponent {
  @Input() title: string = '';
  @Input() backButton: boolean = false;
  @Input() route: string = '';
  @Input() activeLinks: FormBoxLinks = {forgotPassword: false, haveAccount: false, dontHaveAccount: false};
}
