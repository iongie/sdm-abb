import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { takeUntil, count } from 'rxjs/operators';
import { NgbPanelChangeEvent, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiWithTokenService } from '../../../_service/api-with-token/api-with-token.service';
import { CookieService } from 'ngx-cookie-service';
import { SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-add-kontrak-kerja',
  templateUrl: './add-kontrak-kerja.component.html',
  styleUrls: ['./add-kontrak-kerja.component.css']
})
export class AddKontrakKerjaComponent implements OnInit {
  private subs: Subject<void> = new Subject();
  temp = [];
  limitTableShow = {
    show: ''
  }
  lokasi;
  formKontrakKerja = {
    idPihakOne: '',
    idPihakTwo: ''
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
  ];
  selected: any[] = [];
  userData;
  SelectionType = SelectionType;
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  closeResult: string;
  constructor(
    public ApiWithTokenService: ApiWithTokenService,
    public router : Router,
    public CookieService : CookieService,
    private datePipe: DatePipe,
    private modalService: NgbModal
  ) { 
    this.limitTableShow.show = "5";
    this.temp = this.rows;
  }

  ngOnInit(): void {
    this.user();
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

   //  On select of dataTable's data row
   onSelect(event) {
    //your code here
   }
 
   //  On Activation of dataTable's data row
   onActivate(event) {
     //your code here
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
    ev.target.closest('datatable-body-cell').blur()
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
