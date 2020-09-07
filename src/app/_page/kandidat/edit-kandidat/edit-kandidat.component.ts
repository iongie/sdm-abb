import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ApiWithTokenService } from '../../../_service/api-with-token/api-with-token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-kandidat',
  templateUrl: './edit-kandidat.component.html',
  styleUrls: ['./edit-kandidat.component.css']
})
export class EditKandidatComponent implements OnInit, OnDestroy {
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
      divisi: ''
    };
    console.log(this.userData);
  }


  viewById(){
    this.activeRoute.params.subscribe(params => {
      const data = {
        id: params.id
      }
      this.ApiWithTokenService.getById(data, 'kandidat/getKandidatById/', this.userData.token)
      .pipe(
        takeUntil(this.subs))
      .subscribe(res => {
        console.log(res.data[0]);
        this.dataKandidat.idLoker = res.data[0].id_lowongan;
        this.dataKandidat.nama = res.data[0].nm_pelamar;
        this.dataKandidat.tempatLahir = res.data[0].tmp_lahir;
        this.dataKandidat.tanggalLahir = res.data[0].tgl_lahir;
        this.dataKandidat.gender = res.data[0].gender;
        this.dataKandidat.alamat = res.data[0].alamat;
        this.dataKandidat.nomorTelepon = res.data[0].telepon;
        this.dataKandidat.nomorMobile = res.data[0].hp;
        this.dataKandidat.email = res.data[0].email_pelamar;
        this.dataKandidat.pendidikanTerakhir = res.data[0].last_education;
        this.dataKandidat.keahlian = res.data[0].keahlian;
        this.dataKandidat.pengalamanKerja = res.data[0].working_experience;
        this.dataKandidat.statusNikah = res.data[0].marital_status;
        this.getProvinsi(res.data[0].id_provinsi);
        this.getKota(res.data[0].id_provinsi, res.data[0].id_kotamadya);
      }) 
    })
  }

  getProvinsi(ev){
    this.ApiWithTokenService.getAll('Kandidat/showAllProvinsi', this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(res => {
      this.dataKandidat.provinsi = res.data.filter(x => {
        return x.id == ev;
      })[0];
      this.Provinsi = res.data;
      console.log(res.data, ev);
    })
  }

  selectProvinsi(ev) {
    console.log(ev);
  }

  getKota(ev, kota){
    const data = {
      id : ev
    }
    this.ApiWithTokenService.getById(data, 'kandidat/getKotaByProvinsi/', this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(res => {
      this.dataKandidat.kota = res.data.filter(x => {
        return x.province_id == kota;
      })[0];
      this.Kota = res.data;
      console.log(res.data, ev, kota);
      console.log(this.dataKandidat);
      
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
    this.router.navigate(['kandidat/data-table']);
  }
  

  editKandidat(){

  }

}
