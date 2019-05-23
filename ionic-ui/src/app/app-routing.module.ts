import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', data: { allowedRoles: [] } },
    {
        path: 'organizations', children: [
            { path: '', loadChildren: './pages/organizations/organizations.module#OrganizationsPageModule', data: { allowedRoles: [] } },
            { path: ':id', loadChildren: './pages/organization/organization.module#OrganizationPageModule', data: { allowedRoles: [] } }
        ], data: { allowedRoles: [] }
    },
    { path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule', data: { allowedRoles: [] } },
    { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule', data: { allowedRoles: [] } },
    {
        path: 'projects', children: [
            { path: '', loadChildren: './pages/projects/projects.module#ProjectsPageModule', data: { allowedRoles: [] } },
            { path: 'type/:type', loadChildren: './pages/projects/projects.module#ProjectsPageModule', data: { allowedRoles: [] } },
            { path: ':id', loadChildren: './pages/project/project.module#ProjectPageModule', data: { allowedRoles: [] } }
        ], data: { allowedRoles: [] }
    },
    {
        path: 'volunteers', children: [
            { path: 'project/:id', loadChildren: './pages/volunteers/volunteers.module#VolunteersPageModule', data: { allowedRoles: ['organization'] } }], data: { allowedRoles: ['organization'] }
    },
    { path: 'new-project', loadChildren: './pages/new-project/new-project.module#NewProjectPageModule', data: { allowedRoles: ['organization'] } },
    { path: 'volunteers-settings', loadChildren: './pages/volunteers-settings/volunteers-settings.module#VolunteersSettingsPageModule', data: { allowedRoles: ['volunteer'] } },
    {
        path: 'organizations-settings',
        loadChildren: './pages/organizations-settings/organizations-settings.module#OrganizationsSettingsPageModule', data: { allowedRoles: ['organization'] }
    },
    { path: 'privacy', loadChildren: './pages/privacy/privacy.module#PrivacyPageModule', data: { allowedRoles: [] } },
    { path: 'calendar', loadChildren: './pages/calendar/calendar.module#CalendarPageModule', data: { allowedRoles: [] } },
    {
        path: 'project-edit',
        children: [
            { path: ':id', loadChildren: './pages/project-edit/project-edit.module#ProjectEditPageModule', data: { allowedRoles: ['organization'] } }
        ], data: { allowedRoles: ['organization'] }
    },
    {
        path: 'change-password',
        children: [
            { path: ':reset', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule', data: { allowedRoles: [] } },
            { path: '', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule', data: { allowedRoles: ['organization', 'volunteer'] } }
        ], data: { allowedRoles: [] }
    },
    { path: 'team', loadChildren: './pages/team/team.module#TeamPageModule', data: { allowedRoles: [] } },
    { path: 'moderators-console', loadChildren: './pages/moderators-console/moderators-console.module#ModeratorsConsolePageModule' },
    { path: 'admins-console', loadChildren: './pages/admins-console/admins-console.module#AdminsConsolePageModule' },
    { path: '**', loadChildren: './pages/not-found/not-found.module#NotFoundPageModule', data: { allowedRoles: [] } }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // , { useHash: true }
    exports: [RouterModule]
})
export class AppRoutingModule {
}
