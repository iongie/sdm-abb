import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { ApiNoTokenService } from '../../_service/api-no-token/api-no-token.service';
import swal from 'sweetalert2';

// Warning Type Alert
export function typeWarning() {
  swal.fire("Warning!", "Gagal Authorisasi!", "warning");
}

// Success Type Alert
export function typeSuccess() {
  swal.fire("Good job!", "Silahkan cek email anda untuk reset password!", "success");
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @ViewChild('f', {static: false}) forogtPasswordForm: NgForm;

  data = {
    username: '',
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public ApiNoTokenService: ApiNoTokenService,
    public CookieService : CookieService) { }

  // On submit click, reset form fields
  onSubmit() {
      this.forogtPasswordForm.reset();
  }

  // On login link click
  onLogin() {
      this.router.navigate(['login'], { relativeTo: this.route.parent });
  }

  // On registration link click
  onRegister() {
      this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  forgotpassword(){
    this.ApiNoTokenService.resetPassword(this.data).subscribe( res=>{
      if (res.status == 200){
        typeSuccess();
      }
    })
  }

}
