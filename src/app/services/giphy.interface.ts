interface GiphyImage {
    id: string
    title: string
    images: {
        [sizeName: string]: {
            height: string
            size: string
            url: string
            width: string
        }
    }
}

export interface Giphy {
    data: Array<GiphyImage>
    meta: {
        msg: string
        response_id: string
        status: number
    }
    pagination: {
        count: number
        offset: number
        total_count: number
    }
}

export interface Images extends Array<{
    url: string
    id: string
    title: string
}> {}

export interface ShortResponse {
    images: Images
    offset: Giphy["pagination"]['offset']
    total_count: Giphy["pagination"]['total_count']
}
