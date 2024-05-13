import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgot-passsword',
  templateUrl: './forgot-passsword.component.html',
  styleUrls: ['./forgot-passsword.component.css']
})
export class ForgotPassswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ForgotPassswordComponent>,
    private _loginService: LoginService
  ) { }
  emailOrPhone: string = '';
  ngOnInit(): void {
  }


  onCloseClick(): void {
    this.dialogRef.close();
  }

  forgotPassword(){
    this._loginService.forgotPasswordViaEmail(this.emailOrPhone).subscribe((res)=>{
      console.log(res);
    })
  }
}
