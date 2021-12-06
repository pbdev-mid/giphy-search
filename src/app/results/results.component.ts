import {Component, OnInit} from '@angular/core';
import {GiphyService} from "../services/giphy.service";

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
    constructor(
        public giphy: GiphyService
    ) {
    }
}
