import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@floyd-devops/core';
import { ComponentComponent } from './component/component.component';

@NgModule({
  imports: [CommonModule, CoreModule],
  declarations: [ComponentComponent]
})
export class ComponentsModule {}
