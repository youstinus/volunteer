import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'project', loadChildren: './pages/project/project.module#ProjectPageModule' },
  { path: 'nav-menu', loadChildren: './pages/nav-menu/nav-menu.module#NavMenuPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'user-settings', loadChildren: './pages/user-settings/user-settings.module#UserSettingsPageModule' },
  { path: 'organization', loadChildren: './pages/organization/organization.module#OrganizationPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
