import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient){}
  token: string;



  login(param){
  return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/auth/v1/userLogin/emailOrPhone`, param);
}

forgotPasswordViaEmail(emailorMobile: string){
  return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/auth/v1/forgetPasswordEmail/${emailorMobile}`, {observe:'response'});
}

otpValidate(otpParams){
  return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/auth/v1/otpValidate`, otpParams);
}

changePassword(passwordParam){
  return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/auth/v1/changePassword`, passwordParam);
}

forgetPassword(newPassword){
  return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/auth/v1/forgetPassword`, newPassword);
}

}
