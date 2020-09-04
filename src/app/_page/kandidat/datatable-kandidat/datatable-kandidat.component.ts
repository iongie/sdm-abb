import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { typeSuccess } from '../../forgot-password/forgot-password.component';
import { ApiWithTokenService } from '../../../_service/api-with-token/api-with-token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-datatable-kandidat',
  templateUrl: './datatable-kandidat.component.html',
  styleUrls: ['./datatable-kandidat.component.css']
})
export class DatatableKandidatComponent implements OnInit {
  private subs: Subject<void> = new Subject();
  temp = [];
  limitTableShow = {
    show: ''
  }
  rows = [
    
  ];
  userData;
  dataApproval = {
    id: '',
    description:'',
    flag: '',
    start_date: '',
    end_date: '',
    user_proses: ''
  }
  columns = [
    {
      "name": "Branch"
    },
    {
      "name": "Divisi"
    },
    {
      "name": "Jabatan"
    },
    {
      "name": "Bagian"
    },
    {
      "name": "Periode"
    },
  ]
  SelectionType = SelectionType;
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  closeResult: string;
  // ColumnMode = ColumnMode;
  constructor(
    public ApiWithTokenService: ApiWithTokenService,
    public router : Router,
    public CookieService: CookieService,
    private modalService: NgbModal
  ) {
    this.limitTableShow.show = "5";
    this.temp = this.rows;
   }

  ngOnInit(): void {
    this.user();
    this.kandidat();
    this.refresh();
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

  kandidat(){
    this.ApiWithTokenService.getAll('kandidat/showAllKandidat', this.userData.token).subscribe( res => {
      this.rows = res.data.map(x => {
        const data = {
          alamat: x.alamat,
          created_by: x.created_by,
          created_date: x.created_date,
          document: x.document,
          email_pelamar: x.email_pelamar,
          gender: x.gender,
          hp: x.hp,
          id: x.id,
          id_hasil: x.id_hasil,
          id_jadwal: x.id_jadwal,
          id_kotamadya: x.id_kotamadya,
          id_lowongan: x.id_lowongan,
          id_provinsi: x.id_provinsi,
          keahlian: x.keahlian,
          last_education: x.last_education,
          marital_status: x.marital_status,
          nm_kota: x.nm_kota,
          nm_pelamar: x.nm_pelamar,
          nm_provinsi: x.nm_provinsi,
          no_ktp: x.no_ktp,
          path: x.path,
          status: x.status,
          telepon: x.telepon,
          tgl_lahir: x.tgl_lahir,
          tmp_lahir: x.tmp_lahir,
          updated_by: x.updated_by,
          updated_date: x.updated_date,
          working_experience: x.working_experience,
          hiddenEditByJadwalKandidat: (x.status == 'on process')? true: false
        };

        return data
      })
      console.log(res.data);
    })
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase(); 
    // get the amount of columns in the table
    const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // assign filtered matches to the active datatable

    // filter our data
    const temp = this.temp.filter(item =>  {
       // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(val) !== -1) ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    console.log('Select Event', selected);
  }

  // This function is used in open
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return `with: ${reason}`;
    }
  }
  
  openModalApproval(value, ev, content){
    this.dataApproval.id= value;
    ev.target.closest('datatable-body-cell').blur()
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  approval(){
    const data = {
      id: this.dataApproval.id,
      flag_approval: 'published',
      start_date: this.dataApproval.start_date,
      end_date: this.dataApproval.end_date,
      description: this.dataApproval.description,
      user_proses: this.userData.email
    }
    this.ApiWithTokenService.add(data, 'lowonganKerja/prosesLowongan', this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(res => {
      typeSuccess();
    })
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  update(ev){
    console.log(ev);
    this.router.navigate(['kandidat/edit/'+ev])
  }

  interview(ev){
    this.router.navigate(['interview/add/'+ev]);
  }

  limit(ev){
    console.log(ev);
    this.table.limit = ev;
  }

  refresh() {
    this.ApiWithTokenService.refresh.subscribe(() => {
      this.kandidat();
    });
  }

}
