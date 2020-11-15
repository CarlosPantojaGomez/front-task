/* Node modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Material */
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ExpnsionPanelComponent } from './components/expnsion-panel/expnsion-panel.component';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';


/* Services */
import { HomeService } from './services/home-service.service';
import { CreationPanelComponent } from './components/creation-panel/creation-panel.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpnsionPanelComponent,
    CreationPanelComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule
  ],
  providers: [
    HomeService,
    AlertDialogComponent
  ],
  entryComponents: [AlertDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
