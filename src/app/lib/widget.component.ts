import { AfterViewInit, Component, ContentChild, Optional } from "@angular/core";
import { HeaderToken, HEADER_TOKEN, WidgetHeaderComponent } from "./widget-header.component";

@Component({
  selector: 'lib-widget',
  template: `
    <section class="wrapper">
      <ng-content></ng-content>
    </section> 
  `,
})
export class WidgetComponent implements AfterViewInit {
  // It turns out that our header ended up in the application bundle despite we are not using it
  // We have a reference to the header component in two places. The first one as a value of the @ContentChild
  // and the second one as type definition

  /**
   * We know that after compilation into javascript all types definitions, interfaces and so on will be removed
   * So the second reference will be removed from the compiled version, but the first one is being used as a value of the @ContentChild
   * And the class name WidgetHeaderComponent will be used as a token value in our dependency injectors
   * This is actually the key thing because dependency resolving happens at the run time while tree-shaking it is a build time which obviously
   * happens before the run time. Therefore, at the build time compiler doesn't have information if we indeed use this header component or not,
   * so compiler takes decision to include this component into the bundle as well.
   */

  // SOLUTION: what the conclusion could be, so it looks like that we should somehow get rid of this direct reference to our header component in our widget
  // This is where the lightweight token comes into play
  // The idea behind this pattern is to use some tiny abstract class as a token for our header component and actual implementation will be resolved
  // via dependency injection later at the runtime.
  // It will lead to the situation when our abstract class will be retained which means not three shaken but the whole implementation this whole our component
  // will be excluded from the bundle if it's not being used

  // @ContentChild(WidgetHeaderComponent)
  // header: WidgetHeaderComponent | null = null;


  /**
   * Only our token retained but the class itself should be successfully shaken from our bundle
   */
  // @ContentChild(HeaderToken)
  // header: HeaderToken | null = null;

  // This approach with token might be better than our abstract class because it ends up doesn't contain any code from abstract class
  // Always go with InjectionToken, except you want to use abstract class in case sharing common functions
  @ContentChild(HEADER_TOKEN)
  header: WidgetHeaderComponent | null = null;

  // Sugar syntax
  // constructor(@Optional() private anotherHeader: WidgetHeaderComponent) {}
  // constructor(@Optional() @Inject(WidgetHeaderComponent) private anotherHeader: WidgetHeaderComponent) {}

  ngAfterViewInit(): void {
    this.header?.refresh();
  }
}