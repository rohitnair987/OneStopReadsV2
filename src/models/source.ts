import { News } from "src/models/news";

export class Source {
    _id: string;
    name: string;
    description: string;
    url: string;
    tags: string;
    dateLastModified: Date;
    lastModifiedBy: string;
    imgUrl: string

    news: News[]
}