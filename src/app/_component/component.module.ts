import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';
import { CustomizerComponent } from './customizer/customizer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

//DIRECTIVES
import { ToggleFullscreenDirective } from "../_directives/toggle-fullscreen.directive";
import { SidebarDirective } from '../_directives/sidebar.directive';
import { SidebarLinkDirective } from '../_directives/sidebarlink.directive';
import { SidebarListDirective } from '../_directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from '../_directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from '../_directives/sidebartoggle.directive';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent,
    NotificationSidebarComponent,
    CustomizerComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    SidebarDirective,
    SidebarLinkDirective,
    SidebarListDirective,
    SidebarAnchorToggleDirective,
    SidebarToggleDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    PerfectScrollbarModule,
    TranslateModule
  ],
  exports: [
    FooterComponent,
    NotificationSidebarComponent,
    CustomizerComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    SidebarDirective
  ],
})
export class ComponentModule { }
