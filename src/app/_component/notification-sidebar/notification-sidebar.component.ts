import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/_service/layout/layout.service';

@Component({
  selector: 'app-notification-sidebar',
  templateUrl: './notification-sidebar.component.html',
  styleUrls: ['./notification-sidebar.component.css']
})
export class NotificationSidebarComponent implements OnInit {

  layoutSub: Subscription;
  isOpen = false;

  @ViewChild('sidebar', {static: false}) sidebar: ElementRef;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private layoutService: LayoutService
  ) { 
    this.layoutSub = layoutService.notiSidebarChangeEmitted$.subscribe(
      value => {
        if (this.isOpen) {
          this.renderer.removeClass(this.sidebar.nativeElement, 'open');
          this.isOpen = false;
        }
        else {
          this.renderer.addClass(this.sidebar.nativeElement, 'open');
          this.isOpen = true;
        }
      });
  }

  
  ngOnInit() {

  }

  ngOnDestroy() {
    if(this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }



  onClose() {
    this.renderer.removeClass(this.sidebar.nativeElement, 'open');
    this.isOpen = false;
  }

}
