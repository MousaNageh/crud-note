import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private renderer: Renderer2;
  private requestsNumber = 0;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  startLoader(): void {
    this.requestsNumber++;
    if(document.querySelector('.loader-wrapper'))
    this.renderer.addClass(document.querySelector('.loader-wrapper'), 'show');
  }
  stopLoader(): void {
    this.requestsNumber--;
    if (this.requestsNumber <= 0) {
      this.requestsNumber = 0;
      this.renderer.removeClass(
        document.querySelector('.loader-wrapper'),
        'show'
      );
    }
  }
}
