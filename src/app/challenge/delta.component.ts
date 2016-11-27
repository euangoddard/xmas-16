import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'semitone-delta',
  template: `{{ arrow }}{{ deltaAbsolute }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemitoneDeltaComponent {
  @Input() public delta;

  get arrow(): string {
    let arrowChar: string;
    if (this.delta === null) {
      arrowChar = null;
    } else if (this.delta === 0) {
      arrowChar = '=';
    } else if (0 < this.delta) {
      arrowChar = '↑';
    } else {
      arrowChar = '↓';
    }
    return arrowChar;
  }

  get deltaAbsolute(): number {
    return (this.delta === null) ? null : Math.abs(this.delta);
  }
}
