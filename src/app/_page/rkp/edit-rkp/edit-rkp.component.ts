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
  swal.fire("Good job!", "Rencana Kebutuhan Pegawai telah berhasil diupdate!", "success");
}

@Component({
  selector: 'app-edit-rkp',
  templateUrl: './edit-rkp.component.html',
  styleUrls: ['./edit-rkp.component.css']
})
export class EditRkpComponent implements OnInit, OnDestroy {
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
  selectedLokasi= {
    idLokasi: ''
  };
  date: Date;
  constructor(
    public ApiWithTokenService: ApiWithTokenService,
    private activeRoute: ActivatedRoute,
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
      this.ApiWithTokenService.getById(data, 'rencanaKebutuhan/getRencanaById/', this.userData.token)
      .pipe(
        takeUntil(this.subs))  
      .subscribe(res => {
        console.log(res);
        this.getLokasi(res.data[0].branch_code+' - '+res.data[0].branch_name);
        this.getDivisi(res.data[0].id_divisi)
        this.getJabatan(res.data[0].id_divisi, res.data[0].id_jabatan);
        this.getBagian(res.data[0].id_bagian, res.data[0].id_jabatan);
        this.dataRkp = {
          personil: res.data[0].jml_personil,
          idDivisi: res.data[0].id_divisi,
          idBagian: res.data[0].id_bagian,
          idJabatan: res.data[0].id_jabatan,
          createdBy: res.data[0].created_by,
          tahun: res.data[0].rkap_periode,
          periode: res.data[0].periode_pelaksanaan,
          branch_code: res.data[0].branch_code+' - '+res.data[0].branch_name
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
      // this.selectedBagian.idBagian = this.Bagian.filter(x=> {
      //   return idBagian == x.id_bagian
      // })[0];
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

  editRkp(){

  }
}
