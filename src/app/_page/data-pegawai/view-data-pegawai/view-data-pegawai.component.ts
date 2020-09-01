import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-data-pegawai',
  templateUrl: './view-data-pegawai.component.html',
  styleUrls: ['./view-data-pegawai.component.css']
})
export class ViewDataPegawaiComponent implements OnInit {
  t: any;
  currentJustify = 'start';
  currentOrientation = 'horizontal';
  constructor() { }

  ngOnInit(): void {
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'bar') {
      $event.preventDefault();
    }
  };

}
