import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ApiWithTokenService } from '../../../_service/api-with-token/api-with-token.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';

// Success Type Alert
export function typeSuccess() {
  swal.fire("Good job!", "Rencana Kebutuhan Pegawai telah berhasil dihapus!", "success");
}

@Component({
  selector: 'app-datatable-rkp',
  templateUrl: './datatable-rkp.component.html',
  styleUrls: ['./datatable-rkp.component.css']
})
export class DatatableRkpComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  temp = [];
  limitTableShow = {
    show: ''
  }
  rows = [];
  userData;
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
  constructor(
    public ApiWithTokenService: ApiWithTokenService,
    public router : Router,
    public CookieService: CookieService
  ) {
    this.limitTableShow.show = "5";
   }

  ngOnInit(): void {
    this.user();
    this.rkp();    
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

  rkp(){
    this.ApiWithTokenService.getAll('rencanaKebutuhan/showallrencana', this.userData.token).subscribe( res => {
      this.rows = res.data.map(x => {
        const data = {
          id: x.id,
          branch: x.branch_name,
          divisi: x.nm_divisi,
          jabatan: x.nm_jabatan,
          bagian: x.nm_bagian,
          periode: x.rkap_periode + '-' +x.periode_pelaksanaan,
          pegawai: x.jml_personil,
          status: x.status
        };
        return data;
      });
      console.log(this.rows);
      this.temp = this.rows;
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

  delete(ev){
    const data = {
      id: ev
    }
    this.ApiWithTokenService.getById(data, 'rencanaKebutuhan/deleterencana/', this.userData.token)
    .pipe(
      takeUntil(this.subs))
    .subscribe(res => {
      typeSuccess();
    })
  }

  update(ev){
    console.log(ev);
    this.router.navigate(['rencana-kebutuhan-pegawai/edit/'+ev])
  }

  limit(ev){
    console.log(ev);
    this.table.limit = ev;
  }

}
