// Angular-three stubs for Jest — re-exported as decorated Angular primitives
// so Angular's DI / compiler does not reject them as "not a component/directive".
import { Directive, Component, Input } from '@angular/core';

@Directive({ selector: '[args]', standalone: true })
export class NgtArgs {
  @Input() args: unknown[] = [];
}

@Component({ selector: 'ngt-canvas', standalone: true, template: '<ng-content />' })
export class NgtCanvasImpl {}

@Directive({ selector: '[canvasContent]', standalone: true })
export class NgtCanvasContent {}

export const extend = jest.fn();
export const injectStore = jest.fn(() => ({
  snapshot: {
    camera: {},
    gl: { domElement: document.createElement('canvas') },
    scene: { add: jest.fn(), remove: jest.fn() },
  },
}));
export const injectBeforeRender = jest.fn();
export const loaderResource = jest.fn(() => ({ value: jest.fn(() => null) }));
