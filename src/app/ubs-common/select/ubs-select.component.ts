import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ubs-select',
    styleUrls: ['./ubs-select.component.scss', '../../../../assets/css/global.scss'],
    template: require('./ubs-select.component.html')
})
export class UbsSelectComponent {
    @Input() public label: string;
    @Input() public items: string[];
    @Input() public selectedItem: string;
    @Output() public onChangedSelection: EventEmitter<string> = new EventEmitter();
}
