import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EntryComponent } from './en.component';
import { NoteFormComponent } from './nform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NPComponent } from './np.component';
import { HttpClientModule } from '@angular/common/http';
import { EditFormComponent } from './edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    NoteFormComponent,
    NPComponent,
    EditFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'notes', component: NPComponent},
      { path: 'addnote', component: NoteFormComponent },
      { path: 'editnote', component: EditFormComponent},
      { path: '', redirectTo: '/notes', pathMatch: 'full' },
      { path: '**', redirectTo: 'notes', pathMatch: 'full'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
