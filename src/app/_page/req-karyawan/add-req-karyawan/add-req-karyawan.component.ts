import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
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
  selector: 'app-add-req-karyawan',
  templateUrl: './add-req-karyawan.component.html',
  styleUrls: ['./add-req-karyawan.component.css']
})
export class AddReqKaryawanComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  acc: any;
  lokasi;
  datarkap = {
    jml_personil: '-',
    nm_bagian: '-',
    nm_jabatan: '-',
    nm_divisi: '-',
    branch_code: '-',
    branch_name: '-',
    periode_pelaksanaan: '-',
    rkap_periode: '-',
    id_divisi: '-',
    id_jabatan: '-',
    id_bagian: '-'
  }
  dataReqKaryawan = {
    startDate: '',
    endDate: '',
    idRkap: '',
    personil : ''
  }
  formKualifikasi = {
    gender: '',
    keahlian: '',
    pendidikanMinimum: '',
    usiaMaximum: 0,
    usiaMinimum: 0,
    pengalamanKerja: '',
    reason: ''
  }
  rpk = {
    condition: ''
  };
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
  disable: boolean;
  constructor(
    public ApiWithTokenService: ApiWithTokenService,
    public router : Router,
    public CookieService : CookieService,
    private datePipe: DatePipe
  ) { 
    this.rpk.condition = 'yes';
    this.disable = false;
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
    this.getrkap();
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
  }

  getrkap(){
    const data = {
      branch_code: this.userData.branch_code,
      id_divisi: this.userData.divisi,
      thn_rkap: this.datePipe.transform(Date.now(),'yyyy')
    }
    this.ApiWithTokenService.add(data, 'rencanaKebutuhan/showRencanaByDivisi', this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.RekapPeriode = x.data.map(x=> {
        const data = {
          tampil: x.periode_pelaksanaan+' - '+x.nm_bagian ,
          branch_code: x.branch_code ,
          branch_name: x.branch_name ,
          created_by: x.created_by ,
          created_date: x.created_date ,
          id: x.id ,
          id_bagian: x.id_bagian ,
          id_divisi: x.id_divisi ,
          id_jabatan: x.id_jabatan ,
          jml_personil: x.jml_personil ,
          kd_jabatan: x.kd_jabatan ,
          nm_bagian: x.nm_bagian ,
          nm_divisi: x.nm_divisi ,
          nm_jabatan: x.nm_jabatan ,
          periode_pelaksanaan: x.periode_pelaksanaan ,
          rkap_periode: x.rkap_periode ,
          status: x.status ,
          updated_by: x.updated_by ,
          updated_date: x.updated_date ,
          used: x.used ,
        }
        return data
      });
      console.log(this.RekapPeriode);
    })
  }

  selectRkap(ev) {
    this.datarkap = ev;
  }

  getLokasi() {
    const apiUrl = 'Cabang/getBranchById/'+this.userData.branch_code
    this.ApiWithTokenService.getAll(apiUrl, this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      const lokasi = x.data.map(x=> {
        const data = {
          lokasiName: x.branch_code+' - '+x.branch_name,
          branch_code: x.branch_code
        }
        return data;
      })
      this.lokasi = lokasi[0].lokasiName;
    })
  }

  getJabatan() {
    const apiUrl = 'setupJabatan/getSetupJabatanByDivisi/'+this.userData.divisi
    this.ApiWithTokenService.getAll(apiUrl, this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.Jabatan = x.data;
    })
  }

  selectJabatan(ev){
  }

  getBagian() {
    const apiUrl = 'bagian/getBagianBySetupJabatan/'+this.userData.divisi
    this.ApiWithTokenService.getAll(apiUrl, this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.Bagian = x.data;
    })
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

  rpkAction(){
    if(this.rpk.condition == 'yes'){
      this.disable = false;
    } else {
      this.disable = true;
    }
  }

  addReqKaryawan(){
    const data = {
      rkap_periode: this.datarkap.rkap_periode, 
      id_divisi: this.datarkap.id_divisi,
      branch_code: this.datarkap.branch_code,
      id_jabatan: this.datarkap.id_jabatan,
      id_bagian: this.datarkap.id_bagian,
      periode: this.datarkap.periode_pelaksanaan,
      jml_personil: this.dataReqKaryawan.personil,
      gender: this.formKualifikasi.gender,
      requirement_skill: this.formKualifikasi.keahlian,
      requirement_degree: this.formKualifikasi.pendidikanMinimum,
      max_age: this.formKualifikasi.usiaMaximum,
      min_age: this.formKualifikasi.usiaMinimum,
      working_experince: this.formKualifikasi.pengalamanKerja,
      reason: this.formKualifikasi.reason,
      created_by: this.userData.email
    }
    this.ApiWithTokenService.add(data, 'rencanaKebutuhan/saveRencana', this.userData.token).subscribe(res => {
      typeSuccess();
    })
  }

  cancel(){
    this.router.navigate(['request-pegawai/data-table']);
  }
}
