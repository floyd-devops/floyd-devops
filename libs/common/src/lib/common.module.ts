import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@floyd-devops/core';

@NgModule({
  imports: [AngularCommonModule, CoreModule, BrowserAnimationsModule]
})
export class CommonModule {}
