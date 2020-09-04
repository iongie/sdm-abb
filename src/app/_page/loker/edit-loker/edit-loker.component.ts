import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ApiWithTokenService } from '../../../_service/api-with-token/api-with-token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-loker',
  templateUrl: './edit-loker.component.html',
  styleUrls: ['./edit-loker.component.css']
})
export class EditLokerComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  acc: any;
  lokasi;
  dataLoker = {
    branch: '',
    id_lowongan: '',
    id_request: '',
    branch_code: '',
    branch_name : '',
    id_divisi: '',
    nm_divisi: '',
    id_jabatan: '',
    nm_jabatan : '',
    requirement_skill: '',
    requirement_degree: '',
    gender: '',
    min_age: '',
    max_age: '',
    due_date: '',
    working_experience : '',
    status: '',
    created_date: '',
    updated_date: '',
    created_by : '',
    updated_by : '',
    date_publish: '',
    start_publish_date: ''
  }
  userData;
  Divisi = [];
  Lokasi = [];
  Jabatan = [];
  Bagian = [];
  Periode = [];
  RekapPeriode = [];
  date: Date;
  minDate: Date;
  selectedDivisi= {
    idDivisi: ''
  };
  selectedJabatan= {
    idJabatan: ''
  };
  selectedBagian= {
    idBagian: ''
  };
  selectedLokasi= {
    idLokasi: ''
  };
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
      divisi: ''
    };
    console.log(this.userData);
  }

  viewById(){
    this.activeRoute.params.subscribe(params => {
      const data = {
        id: params.id,
      };
      this.ApiWithTokenService.getById(data, 'lowonganKerja/getDataByid/', this.userData.token)
      .pipe(
        takeUntil(this.subs))  
      .subscribe(res => {
        console.log(res);
        this.getLokasi(res.data[0].branch_code+' - '+res.data[0].branch_name);
        this.getDivisi(res.data[0].id_divisi)
        this.getJabatan(res.data[0].id_divisi, res.data[0].id_jabatan);
        this.getBagian(res.data[0].id_bagian, res.data[0].id_jabatan);
        this.dataLoker = {
          branch: res.data[0].branch_code+' - '+res.data[0].branch_name,
          id_lowongan: res.data[0].id_lowongan,
          id_request: res.data[0].id_request,
          branch_code: res.data[0].branch_code,
          branch_name : res.data[0].branch_name,
          id_divisi: res.data[0].id_divisi,
          nm_divisi: res.data[0].nm_divisi,
          id_jabatan: res.data[0].id_jabatan,
          nm_jabatan : res.data[0].nm_jabatan,
          requirement_skill: res.data[0].requirement_skill,
          requirement_degree: res.data[0].requirement_degree,
          gender: res.data[0].gender,
          min_age: res.data[0].min_age,
          max_age: res.data[0].max_age,
          due_date: res.data[0].due_date,
          working_experience : res.data[0].working_experience,
          status: res.data[0].status,
          created_date: res.data[0].created_date,
          updated_date: res.data[0].updated_date,
          created_by : res.data[0].created_by,
          updated_by : res.data[0].updated_by,
          date_publish: res.data[0].date_publish,
          start_publish_date: res.data[0].start_publish_date
        }
      })
    })
  }

  getLokasi(lokasiById) {
    const apiUrl = 'Cabang/getallbranch/'
    this.ApiWithTokenService.getAll(apiUrl, this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.Lokasi = x.data.map(x=> {
        const data = {
          lokasiName: x.branch_code+' - '+x.branch_name,
          branch_code: x.branch_code
        }
        return data;
      })
      this.selectedLokasi.idLokasi = this.Lokasi.filter(x=> {
        return lokasiById == x.lokasiName
      })[0];
    })
  }

  getDivisi(idDivisi) {
    const apiUrl = 'divisi/getalldivisi/'
    this.ApiWithTokenService.getAll(apiUrl, this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.Divisi = x.data;
      this.selectedDivisi.idDivisi = this.Divisi.filter(x=> {
        return idDivisi == x.id
      })[0];
    })
  }

  getJabatan(idDivisi, idJabatan) {
    const apiUrl = 'setupJabatan/getSetupJabatanByDivisi/'+idDivisi
    this.ApiWithTokenService.getAll(apiUrl, this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.Jabatan = x.data;
      this.selectedJabatan.idJabatan = this.Jabatan.filter(x=> {
        return idJabatan == x.id_jabatan
      })[0];
      console.log(this.Jabatan);
    })
  }

  getBagian(idBagian, idJabatan) {
    const apiUrl = 'bagian/getBagianBySetupJabatan/'+idJabatan
    this.ApiWithTokenService.getAll(apiUrl, this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.Bagian = x.data;
      this.selectedBagian.idBagian = this.Bagian.filter(x=> {
        return idBagian == x.id_bagian
      })[0];
      console.log(this.Bagian);
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

  cancel(){
    this.router.navigate(['/lowongan-kerja/data-table']);
  }

  editLoker(){

  }

}
