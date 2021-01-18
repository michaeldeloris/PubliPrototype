import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { PublicationsComponent } from './publications/publications.component';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { Routes, RouterModule } from '@angular/router';
import { PublicationEditComponent } from './publications/publication-edit/publication-edit.component';
import { PublicationDetailsComponent } from './publications/publication-details/publication-details.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { UsersComponent } from './users/users.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthRouteGuardService } from './services/auth-route-guard.service';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: PublicationsComponent, data: {title : 'Accueil'}},
  {path: 'publication', component: PublicationDetailsComponent, data: {title : 'Publication'}},
  {path: 'publication/add', component: PublicationEditComponent, canActivate : [AuthRouteGuardService], data: {title : 'Ajout'}},
  {path: 'publication/edit', component: PublicationEditComponent, canActivate : [AuthRouteGuardService], data: {title : 'Édition'}},
  {path: 'users', component: UsersComponent, canActivate : [AuthRouteGuardService], data: {roles: ['ADMIN'], title: 'Utilisateurs'}},
  {path: 'users/add', component: UserAddComponent, data: {title : 'Inscription'}},
  {path: 'users/edit', component: UserEditComponent, canActivate : [AuthRouteGuardService], data: {roles: ['ADMIN'], title : 'Édition'}},
  {path: 'users/detail', component: UserDetailComponent, canActivate : [AuthRouteGuardService], data: {roles: ['ADMIN', 'USER'], title : 'Détail'}},
  {path: 'login', component: LoginComponent, data: {title : 'Connexion'}},
  {path: 'unauthorized', component: UnauthorizedComponent, data: {title : 'Accès refusé'}},
  {path: '**', component: PageNotFoundComponent, data: {title : '404'}}
];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    FooterComponent,
    PublicationsComponent,
    PublicationEditComponent,
    PublicationDetailsComponent,
    MessageEditComponent,
    UsersComponent,
    UserAddComponent,
    UserEditComponent,
    LoginComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    UserDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
