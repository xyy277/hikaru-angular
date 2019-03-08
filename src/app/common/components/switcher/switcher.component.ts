import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})

export class SwitcherComponent {
  @Input() value = false;
  @Input() model: any;
  @Input() attr = 'checkStatus';
  @Output() switchChange: EventEmitter<boolean> = new EventEmitter();

  changeSwitch() {
    console.log('改变状态', this.value);
    if (this.model && typeof this.model === 'object') {
      this.model[this.attr] = this.value;
    }
    this.switchChange.emit(this.value);
  }
}
