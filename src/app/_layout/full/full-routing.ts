import { NgModule } from '@angular/core';
import { FullComponent } from './full.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_service/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path:'dashboard',
        loadChildren: () => import('../../_page/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path:'rencana-kebutuhan-pegawai/view',
        loadChildren: () => import('../../_page/rkp/view-rkp/view-rkp.module').then(m => m.ViewRkpModule),
        canActivate: [AuthGuard]
      },
      {
        path:'rencana-kebutuhan-pegawai/data-table',
        loadChildren: () => import('../../_page/rkp/datatable-rkp/datatable-rkp.module').then(m => m.DatatableRkpModule),
        canActivate: [AuthGuard]
      },
      {
        path:'rencana-kebutuhan-pegawai/add',
        loadChildren: () => import('../../_page/rkp/add-rkp/add-rkp.module').then(m => m.AddRkpModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'rencana-kebutuhan-pegawai/edit',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../../_page/rkp/edit-rkp/edit-rkp.module').then(m => m.EditRkpModule),
            canActivate: [AuthGuard]
          },
        ],
      },
      {
        path:'request-pegawai/view',
        loadChildren: () => import('../../_page/req-karyawan/view-req-karyawan/view-req-karyawan.module').then(m => m.ViewReqKaryawanModule),
        canActivate: [AuthGuard]
      },
      {
        path:'request-pegawai/data-table',
        loadChildren: () => import('../../_page/req-karyawan/datatable-req-karyawan/datatable-req-karyawan.module').then(m => m.DatatableReqKaryawanModule),
        canActivate: [AuthGuard]
      },
      {
        path:'request-pegawai/add',
        loadChildren: () => import('../../_page/req-karyawan/add-req-karyawan/add-req-karyawan.module').then(m => m.AddReqKaryawanModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'request-pegawai/edit',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../../_page/req-karyawan/edit-req-karyawan/edit-req-karyawan.module').then(m => m.EditReqKaryawanModule),
            canActivate: [AuthGuard]
          },
        ],
      },
      {
        path:'kandidat/view',
        loadChildren: () => import('../../_page/kandidat/view-kandidat/view-kandidat.module').then(m => m.ViewKandidatModule),
        canActivate: [AuthGuard]
      },
      {
        path:'kandidat/data-table',
        loadChildren: () => import('../../_page/kandidat/datatable-kandidat/datatable-kandidat.module').then(m => m.DatatableKandidatModule),
        canActivate: [AuthGuard]
      },
      {
        path:'kandidat/add',
        children:[
          {
            path:':id',    
            loadChildren: () => import('../../_page/kandidat/add-kandidat/add-kandidat.module').then(m => m.AddKandidatModule),
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'kandidat/edit',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../../_page/kandidat/edit-kandidat/edit-kandidat.module').then(m => m.EditKandidatModule),
            canActivate: [AuthGuard]
          },
        ],
      },
      {
        path:'lowongan-kerja/view',
        loadChildren: () => import('../../_page/loker/view-loker/view-loker.module').then(m => m.ViewLokerModule),
        canActivate: [AuthGuard]
      },
      {
        path:'lowongan-kerja/data-table',
        loadChildren: () => import('../../_page/loker/datatable-loker/datatable-loker.module').then(m => m.DatatableLokerModule),
        canActivate: [AuthGuard]
      },
      {
        path:'lowongan-kerja/add',
        children: [
          {
            path: ':id',    
            loadChildren: () => import('../../_page/loker/add-loker/add-loker.module').then(m => m.AddLokerModule),
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'lowongan-kerja/edit',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../../_page/loker/edit-loker/edit-loker.module').then(m => m.EditLokerModule),
            canActivate: [AuthGuard]
          },
        ],
      },
      {
        path:'interview/view',
        loadChildren: () => import('../../_page/interview/view-interview/view-interview.module').then(m => m.ViewInterviewModule),
        canActivate: [AuthGuard]
      },
      {
        path:'interview/data-table',
        loadChildren: () => import('../../_page/interview/datatable-interview/datatable-interview.module').then(m => m.DatatableInterviewModule),
        canActivate: [AuthGuard]
      },
      {
        path:'interview/add',
        children:[
          {
            path: ':id',    
            loadChildren: () => import('../../_page/interview/add-interview/add-interview.module').then(m => m.AddInterviewModule),
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'interview/edit',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../../_page/interview/edit-interview/edit-interview.module').then(m => m.EditInterviewModule),
            canActivate: [AuthGuard]
          },
        ],
      },
      {
        path: 'hasil-interview',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../../_page/hasil-interview/hasil-interview.module').then(m => m.HasilInterviewModule),
            canActivate: [AuthGuard]
          },
        ],
      },
      {
        path: 'kontrak-kerja/add',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../../_page/kontrak-kerja/add-kontrak-kerja/add-kontrak-kerja.module').then(m => m.AddKontrakKerjaModule),
            canActivate: [AuthGuard]
          },
        ],
      },
      {
        path:'kontrak-kerja/data-table',
        loadChildren: () => import('../../_page/kontrak-kerja/datatable-kontrak-kerja/datatable-kontrak-kerja.module').then(m => m.DatatableKontrakKerjaModule),
        canActivate: [AuthGuard]
      },
      {
        path:'data-pegawai/data-table',
        loadChildren: () => import('../../_page/data-pegawai/datatable-data-pegawai/datatable-data-pegawai.module').then(m => m.DatatableDataPegawaiModule),
        canActivate: [AuthGuard]
      },
      {
        path:'data-pegawai/view',
        children:[
          {
            path: ':id',    
            loadChildren: () => import('../../_page/data-pegawai/view-data-pegawai/view-data-pegawai.module').then(m => m.ViewDataPegawaiModule),
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path:'reimbursement/data-table',
        loadChildren: () => import('../../_page/reimbursement/datatable-reimbursement/datatable-reimbursement.module').then(m => m.DatatableReimbursementModule),
        canActivate: [AuthGuard]
      },
      {
        path:'reimbursement/view',
        children:[
          {
            path: ':id',    
            loadChildren: () => import('../../_page/reimbursement/view-reimbursement/view-reimbursement.module').then(m => m.ViewReimbursementModule),
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path:'punisment/data-table',
        loadChildren: () => import('../../_page/punisment/datatable-punisment/datatable-punisment.module').then(m => m.DatatablePunismentModule),
        canActivate: [AuthGuard]
      },
      {
        path:'punisment/view',
        children:[
          {
            path: ':id',    
            loadChildren: () => import('../../_page/punisment/view-punisment/view-punisment.module').then(m => m.ViewPunismentModule),
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'punisment/add',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../../_page/punisment/add-punisment/add-punisment.module').then(m => m.AddPunismentModule),
            canActivate: [AuthGuard]
          },
        ],
      },
      {
        path:'reward/data-table',
        loadChildren: () => import('../../_page/reward/datatable-reward/datatable-reward.module').then(m => m.DatatableRewardModule),
        canActivate: [AuthGuard]
      },
      {
        path:'reward/view',
        children:[
          {
            path: ':id',    
            loadChildren: () => import('../../_page/reward/view-reward/view-reward.module').then(m => m.ViewRewardModule),
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'reward/add',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../../_page/reward/add-reward/add-reward.module').then(m => m.AddRewardModule),
            canActivate: [AuthGuard]
          },
        ],
      },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class FullRoutingModule {}