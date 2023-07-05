import { Component, InjectionToken, OnInit } from "@angular/core";

// The suffix token is naming convention
export abstract class HeaderToken {
  abstract refresh(): void;
}

export const HEADER_TOKEN = new InjectionToken<WidgetHeaderComponent>('widget-header');

@Component({
  selector: 'lib-widget-header',
  template: `
    <section class="header">
      <h3>Header</h3>
    </section>
  `,
  providers: [
    { provide: HeaderToken, useExisting: WidgetHeaderComponent },
    {
      provide: HEADER_TOKEN,
      useExisting: WidgetHeaderComponent,
    }
  ]
})
export class WidgetHeaderComponent extends HeaderToken {
  refresh(): void {
    console.log('Refresh!');
  }
}