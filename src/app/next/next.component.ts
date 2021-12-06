import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LoaderService} from "../services/loader.service";
import {GiphyService} from "../services/giphy.service";

@Component({
    selector: 'app-next',
    templateUrl: './next.component.html',
    styleUrls: ['./next.component.scss']
})
export class NextComponent implements OnDestroy, AfterViewInit {
    @ViewChild('spinner') spinner!: ElementRef<HTMLElement>;
    private observer!: IntersectionObserver;

    constructor(
        public loader: LoaderService,
        public giphy: GiphyService
    ) {
    }

    private onShow = ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting && this.giphy.images.length) {
            this.giphy.loadUp()
        }
    }

    ngAfterViewInit(): void {
        this.observer = new IntersectionObserver(this.onShow, {root: null})
        this.observer.observe(this.spinner.nativeElement)
    }

    ngOnDestroy(): void {
        this.observer.disconnect()
    }
}
