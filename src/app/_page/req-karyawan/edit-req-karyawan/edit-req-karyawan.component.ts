import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ApiWithTokenService } from '../../../_service/api-with-token/api-with-token.service';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';

// Success Type Alert
export function typeSuccess() {
  swal.fire("Good job!", "Rencana Kebutuhan Pegawai telah berhasil disimpan!", "success");
}

@Component({
  selector: 'app-edit-req-karyawan',
  templateUrl: './edit-req-karyawan.component.html',
  styleUrls: ['./edit-req-karyawan.component.css']
})
export class EditReqKaryawanComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  acc: any;
  lokasi;
  dataReqKaryawan = {
    id: "",
    tgl_request: "-",
    branch_code: "-",
    branch_name: "-",
    id_divisi: "-",
    nm_divisi: "-",
    id_jabatan: "-",
    nm_jabatan: "-",
    requirement_skill: "-",
    requirement_degree: "-",
    gender: "-",
    min_age: "-",
    max_age: "-",
    due_date: "-",
    working_experience: "-",
    status: "-",
    reason: "-",
    user_proses: "-",
    created_date: "-",
    updated_date: "-",
    created_by: "-",
    updated_by: "-",
    flag_plan: "-",
    id_rencana_kebutuhan: "-",
    id_bagian: "-",
    nm_bagian: "-",
    rkap_periode: "-",
    kd_jabatan: "-",
    periode_laksana: "-",
    jml_personil_plan: "-",
    jml_req: "-"
  }
  userData;
  Divisi = [];
  Jabatan = [];
  Bagian = [];
  Periode = [];
  RekapPeriode = [];
  selectedCity: any;
  selectedRkp= {
    idRkp: ''
  };
  date: Date;
  minDate: Date;
  constructor(
    public ApiWithTokenService: ApiWithTokenService,
    private activeRoute: ActivatedRoute,
    public router : Router,
    public CookieService : CookieService,
    private datePipe: DatePipe
  ) { 
    this.minDate = new Date();
    this.date = new Date();
    this.date.setDate( this.date.getDate() + 365 );
    let x: any = [
      this.datePipe.transform(Date.now(),'yyyy'),
      this.datePipe.transform(this.date, 'yyyy'),
    ]
    this.RekapPeriode = x;
    this.Periode = [
      {
        name:'TW1'
      },
      {
        name:'TW2'
      },
      {
        name:'TW3'
      },
      {
        name:'TW4'
      }
    ]
  }

  ngOnInit(): void {
    this.user();
    this.viewById();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  user() {
    const data =  JSON.parse(this.CookieService.get('gieUs3r'));
    this.userData = {
      address: data.data.address,
      branch_code: data.data.branch_code,
      email: data.data.email,
      name: data.data.name,
      nik: data.data.nik,
      phone_number: data.data.phone_number,
      token: data.data.token,
      token_expired: data.data.token_expired,
      user_role: data.data.user_role,
      user_type: data.data.user_type,
      divisi: data.data.id_divisi
    };
    console.log(this.userData);
  }

  

  viewById(){
    this.activeRoute.params.subscribe(params => {
      const data = {
        id: params.id,
      };
      this.ApiWithTokenService.getById(data, 'requestKaryawan/getRequestKaryawanById/', this.userData.token)
      .pipe(
        takeUntil(this.subs))  
      .subscribe(res => {
        console.log(res);
        
        this.dataReqKaryawan = res.data[0]
        this.getrkap(this.dataReqKaryawan.id,this.dataReqKaryawan.id_divisi);
      })
    })
  }

  getrkap(id, idDivisi){
    const data = {
      branch_code: this.userData.branch_code,
      id_divisi: idDivisi,
      thn_rkap: this.datePipe.transform(Date.now(),'yyyy')
    }
    this.ApiWithTokenService.add(data, 'rencanaKebutuhan/showRencanaByDivisi', this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.RekapPeriode = x.data;
      this.selectedRkp.idRkp = x.data.filter(x => {
        return id == x.id
      })
      console.log(this.RekapPeriode, id);
      
    })
  }

  selectRkap($event){

  }

  
  // Prevent panel toggle code
  public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === '2') {
      $event.preventDefault();
    }
    if ($event.panelId === '3' && $event.nextState === false) {
      $event.preventDefault();
    }
  };

  editReqKaryawan(){

  }

  cancel(){
    this.router.navigate(['request-pegawai/data-table']);
  }

}
