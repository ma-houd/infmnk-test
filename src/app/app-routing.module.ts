import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { DummyComponent } from '@core/components/dummy/dummy.component';
import { LoginPageComponent } from '@modules/login/components/login-page/login-page.component';
import { LoginModule } from '@modules/login/login.module';

import { SpeciesListComponent } from './core/components/species-list/species-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DummyComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'species',
    loadComponent: () => import('./core/components/species-list/species-list.component').then(mod => mod.SpeciesListComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
