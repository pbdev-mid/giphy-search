import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private loading = 0

    constructor() {
    }

    public get isLoading() {
        return !!this.loading
    }

    public start() {
        this.loading++
    }

    public stop() {
        if (!this.loading) return;
        this.loading--
    }
}
