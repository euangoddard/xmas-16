import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'noteSymbol'
})
export class NoteSymbolPipe implements PipeTransform {
  transform(noteName: string): string {
    return noteName ? this.formatNoteName(noteName) : '—';
  }

  private formatNoteName(noteName: string): string {
    return noteName.replace(/#/, '<sup>#</sup>');
  }
}
