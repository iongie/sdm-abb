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
  selector: 'app-add-kandidat',
  templateUrl: './add-kandidat.component.html',
  styleUrls: ['./add-kandidat.component.css']
})
export class AddKandidatComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  acc: any;
  lokasi;
  Provinsi: [];
  Kota: [];
  dataKandidat = {
    idLoker: '',
    nama: '',
    nomorIdentitas: '',
    tempatLahir: '',
    tanggalLahir : '',
    gender: '',
    alamat: '',
    provinsi: {
      id: '',
      name: '',
    },
    kota: {
      id: '',
      name: '',
      province_id: ''
    },
    nomorTelepon: '',
    nomorMobile: '',
    email: '',
    pendidikanTerakhir: '',
    keahlian: '',
    pengalamanKerja: '',
    statusNikah: ''
  }
  userData;
  checkerEmail: boolean;
  messageStatusEmail;
  constructor(
    public ApiWithTokenService: ApiWithTokenService,
    public router : Router,
    public CookieService : CookieService,
    private datePipe: DatePipe,
    private activeRoute: ActivatedRoute,
  ) { 
  }

  ngOnInit(): void {
    this.user();
    this.getProvinsi();
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

  getProvinsi(){
    this.ApiWithTokenService.getAll('Kandidat/showAllProvinsi', this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(res => {
      this.Provinsi = res.data;
    })
  }

  selectProvinsi(ev) {
    console.log(ev);
    this.getKota(ev.id);
  }

  getKota(ev){
    const data = {
      id : ev
    }
    this.ApiWithTokenService.getById(data, 'kandidat/getKotaByProvinsi/', this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(res => {
      this.Kota = res.data;
    })
  }

  checkEmail(ev){
    const data = {
      id : ev
    }
    this.ApiWithTokenService.getById(data, 'Kandidat/checkEmailExistsKandidat/', this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(res => {
      console.log(res);
      this.messageStatusEmail = res.message;
      this.checkerEmail = (res.message =="Email is exists")? true:false;
    })
  }

  cancel(){
    this.router.navigate(['lowongan-kerja/data-table']);
  }
  
  addKandidat(){
    this.activeRoute.params.subscribe(params => {
      const data= {
        id   : "",
        id_lowongan: params.id,
        nm_pelamar : this.dataKandidat.nama,
        tmp_lahir: this.dataKandidat.tempatLahir,
        tgl_lahir: this.dataKandidat.tanggalLahir,
        gender: this.dataKandidat.gender,
        marital_status: this.dataKandidat.statusNikah,
        alamat: this.dataKandidat.alamat,
        id_provinsi: this.dataKandidat.provinsi.id,
        id_kotamadya: this.dataKandidat.kota.id,
        telpon: this.dataKandidat.nomorTelepon,
        hp: this.dataKandidat.nomorMobile,
        email_pelamar: this.dataKandidat.email,
        last_education: this.dataKandidat.pendidikanTerakhir,
        keahlian: this.dataKandidat.keahlian,
        working_experince: this.dataKandidat.pengalamanKerja,
        created_by: this.userData.email
      }
      console.log(data);
      this.ApiWithTokenService.add(data, 'kandidat/saveKandidat/', this.userData.token)
      .pipe(
        takeUntil(this.subs))
      .subscribe(res => {
        typeSuccess();
        this.router.navigate(['/lowongan-kerja/data-table']);
      })
    });
    
  }

}
