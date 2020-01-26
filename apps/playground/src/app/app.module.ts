import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@floyd-devops/common';
import { ComponentsModule } from '@floyd-devops/components';
import { CoreModule } from '@floyd-devops/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    CoreModule,
    ComponentsModule,
    ComponentsModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
