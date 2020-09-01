// Sidebar route metadata
export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    badge: string;
    badgeClass: string;
    isExternalLink: boolean;
    submenu : RouteInfo[];
  }

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    {
        path: '/dashboard', title: 'Dashboard', icon: 'ft-home', class: '', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Rekruitment', icon: 'ft-box', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/rencana-kebutuhan-pegawai/data-table', title: 'Rencana Kebutuhan', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/request-pegawai/data-table', title: 'Request Pegawai', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/lowongan-kerja/data-table', title: 'Lowongan Kerja', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/kandidat/data-table', title: 'Kandidat', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/interview/data-table', title: 'Interview', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Kepegawaian', icon: 'ft-box', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { path: '/kontrak-kerja/data-table', title: 'Kontrak Kerja', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/data-pegawai/data-table', title: 'Data Pegawai', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/reward/data-table', title: 'Reward', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], },
            { path: '/reward/data-table', title: 'Punisment', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], },
            { path: '/reimbursement/data-table', title: 'Reimbursement', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], },
        ]
    },
];
