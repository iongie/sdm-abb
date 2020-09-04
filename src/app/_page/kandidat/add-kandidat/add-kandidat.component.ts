import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ApiWithTokenService } from '../../../_service/api-with-token/api-with-token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-kandidat',
  templateUrl: './add-kandidat.component.html',
  styleUrls: ['./add-kandidat.component.css']
})
export class AddKandidatComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  acc: any;
  lokasi;
  dataKandidat = {
    idLoker: '',
    nama: '',
    nomorIdentitas: '',
    tempatLahir: '',
    tanggalLahir : '',
    gender: '',
    alamat: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    nomorTelepon: '',
    nomorMobile: '',
    email: '',
    pendidikanTerakhir: '',
    keahlian: '',
    pengalamanKerja: ''
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
    this.getLokasi();
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
      divisi: ''
    };
    console.log(this.userData);
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
      console.log(this.Jabatan);
    })
  }

  selectJabatan(ev){
    console.log(ev);
  }

  getBagian() {
    const apiUrl = 'bagian/getBagianBySetupJabatan/'+this.userData.divisi
    this.ApiWithTokenService.getAll(apiUrl, this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.Bagian = x.data;
      console.log(this.Bagian);
    })
  }

  
  // Prevent panel toggle code
  public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === '1') {
      $event.preventDefault();
    }
    if ($event.panelId === '2' && $event.nextState === false) {
      $event.preventDefault();
    }
  };

  cancel(){
    this.router.navigate(['lowongan-kerja/data-table']);
  }
  
  addRkp(){

  }

}
