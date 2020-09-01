import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiWithTokenService } from '../../../_service/api-with-token/api-with-token.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import swal from 'sweetalert2';

// Success Type Alert
export function typeSuccess() {
  swal.fire("Good job!", "Rencana Kebutuhan Pegawai telah berhasil dihapus!", "success");
}

@Component({
  selector: 'app-datatable-data-pegawai',
  templateUrl: './datatable-data-pegawai.component.html',
  styleUrls: ['./datatable-data-pegawai.component.css']
})
export class DatatableDataPegawaiComponent implements OnInit {
  private subs: Subject<void> = new Subject();
  temp = [];
  limitTableShow = {
    show: ''
  }
  rows = [
    {
      id: '1',
      branch: 'x.branch_code'+' - '+'x.branch_name',
      divisi: 'x.nm_divisi',
      jabatan: 'x.nm_jabatan',
      bagian: 'x.nm_bagian',
      periode: 'x.rkap_periode' + '-' +'x.periode_pelaksanaan',
      pegawai: 'x.jml_personil_plan',
      gender: 'x.gender',
      requirementSkill: 'x.requirement_skill',
      requirementDegree: 'x.requirement_degree',
      maxAge: 'x.max_age',
      minAge: 'x.min_age',
      requestPersonil: 'x.jml_req',
      startDate: 'x.due_date',
      endDate: 'x.end_date',
      status: 'x.status' 
    }
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
    // this.loker();
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

  loker(){
    this.ApiWithTokenService.getAll('requestKaryawan/showAlldata', this.userData.token).subscribe( res => {
      this.rows = res.data.map(x => {
        const data = {
          id: x.id,
          branch: x.branch_code+' - '+x.branch_name,
          divisi: x.nm_divisi,
          jabatan: x.nm_jabatan,
          bagian: x.nm_bagian,
          periode: x.rkap_periode + '-' +x.periode_pelaksanaan,
          pegawai: x.jml_personil_plan,
          gender: x.gender,
          requirementSkill: x.requirement_skill,
          requirementDegree: x.requirement_degree,
          maxAge: x.max_age,
          minAge: x.min_age,
          requestPersonil: x.jml_req,
          startDate: x.due_date,
          status: x.status
        };
        return data;
      });
      console.log(res.data);
    })
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase(); 
    // get the amount of columns in the table
    const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    console.log(this.temp);
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
      flag_approval: this.dataApproval.flag,
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
    this.router.navigate(['data-pegawai/view/'+ev])
  }

  kandidat(ev){
    this.router.navigate(['data-pegawai/add/'+ev]);
  }

  limit(ev){
    console.log(ev);
    this.table.limit = ev;
  }

  refresh() {
    this.ApiWithTokenService.refresh.subscribe(() => {
      this.loker();
    });
  }

}
