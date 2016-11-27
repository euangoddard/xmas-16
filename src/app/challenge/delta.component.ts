import { Component, Input } from '@angular/core';

@Component({
  selector: 'semitone-delta',
  template: `<i class="material-icons md-64" *ngIf="icon">{{ icon }}</i><span class="note-text">{{ deltaAbsolute }}</span>`,
})
export class SemitoneDeltaComponent {
  @Input() public delta;

  get icon(): string {
    let iconName: string;
    if (this.delta === null) {
      iconName = null;
    } else if (this.delta === 0) {
      iconName = 'check';
    } else if (0 < this.delta) {
      iconName = 'expand_less';
    } else {
      iconName = 'expand_more';
    }
    return iconName;
  }

  get deltaAbsolute(): number {
    return (this.delta === null) ? null : Math.abs(this.delta);
  }
}
