import { NgModule } from "@angular/core";
import { WidgetHeaderComponent } from "./widget-header.component";
import { WidgetComponent } from "./widget.component";

@NgModule({
  declarations: [WidgetComponent, WidgetHeaderComponent],
  exports: [WidgetComponent, WidgetHeaderComponent],
})
export class WidgetModule {}