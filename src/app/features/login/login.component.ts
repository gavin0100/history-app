import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, FormsModule, PasswordModule, DividerModule, FloatLabelModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  formGroup: FormGroup = new FormGroup({
    username: new FormControl('username', [Validators.required]),
    password: new FormControl('password', [Validators.required]),
  });;
  username: string = "";
  password: string = "";
  
  constructor() { }
}
