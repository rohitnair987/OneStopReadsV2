export class Source {
    name: string;
    description: string;
    url: string;
    tags: string;
    dateLastModified: Date;
    lastModifiedBy: string;
    imgUrl: string

    news: [string]
}

// Remove this interface later.
export interface ISource {
    name: string;
    // description: string;
    url: string;
    // tags: [string];
    // dateLastModified: Date;
    // lastModifiedBy: string;

    // testing
    price: number,
    imgUrl: string

    news: [string]
}