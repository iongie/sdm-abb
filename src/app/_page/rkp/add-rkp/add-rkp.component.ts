import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ApiWithTokenService } from '../../../_service/api-with-token/api-with-token.service';
import swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// Success Type Alert
export function typeSuccess() {
  swal.fire("Good job!", "Rencana Kebutuhan Pegawai telah berhasil disimpan!", "success");
}

@Component({
  selector: 'app-add-rkp',
  templateUrl: './add-rkp.component.html',
  styleUrls: ['./add-rkp.component.css']
})
export class AddRkpComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  acc: any;
  lokasi;
  dataRkp = {
    personil: 0,
    idDivisi: '',
    idBagian: '',
    idJabatan: '',
    createdBy: '',
    tahun: '',
    periode: '',
    branch_code: ''
  }
  userData;
  Divisi = [];
  Jabatan = [];
  Bagian = [];
  Periode = [];
  Lokasi = [];
  RekapPeriode = [];
  selectedCity: any;
  selectedDivisi= {
    idDivisi: ''
  };
  selectedJabatan= {
    idJabatan: ''
  };
  selectedBagian= {
    idBagian: ''
  };
  date: Date;
  constructor(
    public ApiWithTokenService: ApiWithTokenService,
    public router : Router,
    public CookieService : CookieService,
    private datePipe: DatePipe
  ) { 
    
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
    this.getDivisi();
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
      divisi: data.data.id_divisi,
      namaDivisi: data.data.nm_divisi,
      initial: data.data.initial
    };
    console.log(this.userData);
  }

  getLokasi() {
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
    })
  }

  getDivisi() {
    const apiUrl = 'divisi/getalldivisi/'
    this.ApiWithTokenService.getAll(apiUrl, this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.Divisi = x.data;
      console.log(this.Divisi);
    })
  }

  selectDivisi(ev){
    this.getJabatan(ev.id);
  }

  getJabatan(idDivisi) {
    const apiUrl = 'setupJabatan/getSetupJabatanByDivisi/'+idDivisi
    this.ApiWithTokenService.getAll(apiUrl, this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(x => {
      this.Jabatan = x.data;
      console.log(this.Jabatan);
    })
  }

  selectJabatan(ev){
    this.getBagian(ev.id);
  }

  getBagian(idJabatan) {
    const apiUrl = 'bagian/getBagianBySetupJabatan/'+idJabatan
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
    if ($event.panelId === '2') {
      $event.preventDefault();
    }
    if ($event.panelId === '3' && $event.nextState === false) {
      $event.preventDefault();
    }
  };

  addRkp(){
    const data = {
      rkap_periode: this.dataRkp.periode, 
      id_divisi: this.dataRkp.idDivisi,
      branch_code: this.dataRkp.branch_code,
      id_jabatan: this.dataRkp.idJabatan,
      id_bagian: this.dataRkp.idBagian,
      periode: this.dataRkp.periode,
      jml_personil: this.dataRkp.personil,
      created_by: this.userData.email
    };
    this.ApiWithTokenService.add(data,'rencanaKebutuhan/saveRencana',this.userData.token).subscribe(res => {
      typeSuccess();
      this.router.navigate(['/rencana-kebutuhan-pegawai/view']);
    })
  }


}
