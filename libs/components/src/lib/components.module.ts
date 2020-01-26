import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@floyd-devops/core';
import { ComponentComponent } from './component/component.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, CoreModule],
  exports: [ComponentComponent, SidebarComponent],
  declarations: [ComponentComponent, SidebarComponent]
})
export class ComponentsModule {}
