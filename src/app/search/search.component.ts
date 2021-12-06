import {Component, HostListener} from '@angular/core';
import {GiphyService} from "../services/giphy.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    searchText: string = ''

    @HostListener('keyup', ['$event.keyCode'])
    onEnter(keyCode: number) {
        if (keyCode !== 13) return;
        this.search()
    }

    constructor(
        private giphy: GiphyService
    ) {
    }

    search() {
        this.giphy.search(this.searchText)
    }
}
