import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Import provideHttpClient and withFetch
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // HttpClientModule is still needed for HTTP services
    FormsModule
  ],
  providers: [
    provideClientHydration(), // For Angular Universal hydration
    provideHttpClient(withFetch()),
    DatePipe // Enable fetch for HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }