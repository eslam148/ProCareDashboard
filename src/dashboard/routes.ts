export const routes = [
  {
    path: 'AddAdmin',
    loadChildren: () => import('../components/add-admin/add-admin.component').then((m) => m.AddAdminComponent)
  }

  
];