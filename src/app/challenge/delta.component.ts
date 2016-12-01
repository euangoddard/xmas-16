import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'semitone-delta',
  template: `<i class="material-icons md-48">{{ arrow }}</i>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemitoneDeltaComponent {
  @Input() public delta;

  get arrow(): string {
    let arrowName: string;
    if (this.delta === null) {
      arrowName = null;
    } else if (this.delta === 0) {
      arrowName = 'check';
    } else if (0 < this.delta) {
      arrowName = 'arrow_upward';
    } else {
      arrowName = 'arrow_downward';
    }
    return arrowName;
  }

}
