import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[autofocus]'
})
export class AutofocusDirective {
    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.el.nativeElement.focus()
    }
}
