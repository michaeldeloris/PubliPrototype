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

const routes: Routes = [
  {path: "", component: PublicationsComponent},
  {path: "publication/add", component: PublicationEditComponent},
  {path: "publication/edit", component: PublicationEditComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    FooterComponent,
    PublicationsComponent,
    PublicationEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
