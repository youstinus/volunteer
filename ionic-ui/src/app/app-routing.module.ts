import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
    {
        path: 'organizations', children: [
            { path: '', loadChildren: './pages/organizations/organizations.module#OrganizationsPageModule' },
            { path: ':id', loadChildren: './pages/organization/organization.module#OrganizationPageModule' }
        ]
    },
    { path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule' },
    { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
    {
        path: 'projects', children: [
            { path: '', loadChildren: './pages/projects/projects.module#ProjectsPageModule' },
            { path: 'type/:type', loadChildren: './pages/projects/projects.module#ProjectsPageModule' },
            { path: ':id', loadChildren: './pages/project/project.module#ProjectPageModule' }
        ]
    },
    {
        path: 'volunteers', children: [
            // { path: '', loadChildren: './pages/volunteers/volunteers.module#VolunteersPageModule' },
            { path: 'project/:id', loadChildren: './pages/volunteers/volunteers.module#VolunteersPageModule' }]
    },
    { path: 'new-project', loadChildren: './pages/new-project/new-project.module#NewProjectPageModule' },
    { path: 'volunteers-settings', loadChildren: './pages/volunteers-settings/volunteers-settings.module#VolunteersSettingsPageModule' },
    {
        path: 'organizations-settings',
        loadChildren: './pages/organizations-settings/organizations-settings.module#OrganizationsSettingsPageModule'
    },
    { path: 'privacy', loadChildren: './pages/privacy/privacy.module#PrivacyPageModule' },
    { path: 'calendar', loadChildren: './pages/calendar/calendar.module#CalendarPageModule' },
    {
        path: 'project-edit',
        children: [
            { path: ':id', loadChildren: './pages/project-edit/project-edit.module#ProjectEditPageModule' /*'./pages/project/project.module#ProjectPageModule'*/ }
        ]
    },
    {
        path: 'change-password',
        children: [
            { path: ':reset', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule' },
            { path: '', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule' }
        ]
    },
  { path: '**', loadChildren: './pages/not-found/not-found.module#NotFoundPageModule' }



];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
