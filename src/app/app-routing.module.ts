import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';

import { LoginPageComponent } from '@modules/login/components/login-page/login-page.component';
import { LoginModule } from '@modules/login/login.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/species'
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'species',
    children: [
      {
        path: '',
        loadComponent: () => import('./core/components/species-list/species-list.component').then(mod => mod.SpeciesListComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./core/components/species-details/species-details.component').then(mod => mod.SpeciesDetailsComponent)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
