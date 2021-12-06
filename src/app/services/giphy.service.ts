import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {environment} from 'src/environments/environment';
import {LoaderService} from "./loader.service";
import {Giphy, Images, ShortResponse} from "./giphy.interface";

@Injectable({
    providedIn: 'root'
})
export class GiphyService {
    private url = 'https://api.giphy.com/v1/gifs/search'
    private params = {
        q: '',
        limit: environment.pageItemsNumber,
        offset: 0,
        rating: environment.rating,
        bundle: 'clips_grid_picker' // reduce response size
    }

    public images: Images = []
    private total = 0
    public get isFull(): Boolean {
        return this.images.length === this.total
    }

    constructor (
        private http: HttpClient,
        private loader: LoaderService
    ) {
    }

    private store = ({images, offset, total_count}: ShortResponse) => {
        if (offset) this.images.push(...images)
        else this.images = images

        this.total = total_count
        this.loader.stop()
    };

    private simplify = (response: Giphy): ShortResponse => {
        const {offset, total_count} = response.pagination
        const images: Images = response.data.map(image => ({
            url: image.images['original'].url,
            id: image.id,
            title: image.title
        }))

        return {images, offset, total_count}
    };

    private query() {
        const {params} = this

        this.loader.start()
        this.http
            .get<Giphy>(this.url, {params})
            .pipe(
                map(this.simplify)
            )
            .subscribe(this.store)
    }

    public search(q: string) {
        Object.assign(this.params, {
            q,
            offset: 0
        })

        this.query()
    }

    public loadUp() {
        this.params.offset += this.params.limit
        this.query()
    }
}
