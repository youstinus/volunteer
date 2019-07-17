import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', loadChildren: './pages/main/main.module#MainPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
    {
        path: 'organizations',
        children: [
            { path: '', loadChildren: './pages/organizations/organizations.module#OrganizationsPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
            { path: ':id', loadChildren: './pages/organization/organization.module#OrganizationPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] }
        ],
        data: { allowedRoles: [] },
        canActivate: [AuthGuard]
    },
    { path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
    { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
    {
        path: 'projects',
        children: [
            { path: '', loadChildren: './pages/projects/projects.module#ProjectsPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
            { path: 'type/:type', loadChildren: './pages/projects/projects.module#ProjectsPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
            { path: ':id', loadChildren: './pages/project/project.module#ProjectPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] }
        ],
        data: { allowedRoles: [] },
        canActivate: [AuthGuard]
    },
    {
        path: 'volunteers',
        children: [
            { path: 'project/:id', loadChildren: './pages/volunteers/volunteers.module#VolunteersPageModule', data: { allowedRoles: ['organization'] }, canActivate: [AuthGuard] }
        ],
        data: { allowedRoles: ['organization'] },
        canActivate: [AuthGuard]
    },
    { path: 'new-project', loadChildren: './pages/new-project/new-project.module#NewProjectPageModule', data: { allowedRoles: ['organization'] }, canActivate: [AuthGuard] },
    { path: 'volunteers-settings', loadChildren: './pages/volunteers-settings/volunteers-settings.module#VolunteersSettingsPageModule', data: { allowedRoles: ['volunteer'] }, canActivate: [AuthGuard] },
    { path: 'organizations-settings', loadChildren: './pages/organizations-settings/organizations-settings.module#OrganizationsSettingsPageModule', data: { allowedRoles: ['organization'] }, canActivate: [AuthGuard] },
    { path: 'privacy', loadChildren: './pages/privacy/privacy.module#PrivacyPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
    { path: 'calendar', loadChildren: './pages/calendar/calendar.module#CalendarPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
    {
        path: 'project-edit',
        children: [
            { path: ':id', loadChildren: './pages/project-edit/project-edit.module#ProjectEditPageModule', data: { allowedRoles: ['organization'] }, canActivate: [AuthGuard] }
        ],
        data: { allowedRoles: ['organization'] },
        canActivate: [AuthGuard]
    },
    {
        path: 'change-password',
        children: [
            { path: ':reset', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
            { path: '', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule', data: { allowedRoles: ['organization', 'volunteer'] }, canActivate: [AuthGuard] }
        ],
        data: { allowedRoles: [] },
        canActivate: [AuthGuard]
    },
    { path: 'team', loadChildren: './pages/team/team.module#TeamPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] },
    { path: 'moderators-console', loadChildren: './pages/moderators-console/moderators-console.module#ModeratorsConsolePageModule', data: { allowedRoles: ['moderator'] }, canActivate: [AuthGuard] },
    { path: 'admins-console', loadChildren: './pages/admins-console/admins-console.module#AdminsConsolePageModule', data: { allowedRoles: ['admin'] }, canActivate: [AuthGuard] },
    { path: '**', loadChildren: './pages/not-found/not-found.module#NotFoundPageModule', data: { allowedRoles: [] }, canActivate: [AuthGuard] }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)], // , { useHash: true }
    exports: [RouterModule]
})
export class AppRoutingModule {
}
