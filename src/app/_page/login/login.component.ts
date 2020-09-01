import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiNoTokenService } from '../../_service/api-no-token/api-no-token.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';

// Warning Type Alert
export function typeWarning() {
  swal.fire("Warning!", "Gagal Authorisasi!", "warning");
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  data = {
    username: '',
    password: ''
  }
  
  constructor(
    public ApiNoTokenService: ApiNoTokenService,
    public router : Router,
    public CookieService : CookieService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  login() {
    // typeWarning()
    this.ApiNoTokenService.login(this.data).subscribe(res => {
      console.log(res.status);
      
      (res.status == 200)? 
        (
          this.router.navigate(['/dashboard']),
          this.CookieService.set('gieUs3r', JSON.stringify(res))
        ): typeWarning();
    })
  }

}
