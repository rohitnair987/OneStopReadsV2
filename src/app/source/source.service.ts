import { Injectable } from '@angular/core';
import { ISource } from 'src/models/source';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor() { }

  getSources(): ISource[] {
    return [
      {
        name: "bbc",
        url: "bbc.com",
        price: 32,
        imgUrl: "https://pbs.twimg.com/profile_images/991395737329176576/9q7_JzFa_400x400.jpg"
      },
      {
        name: "nyt",
        url: "nytimes.com",
        price: 3.4,
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Bulma_Lithograph.PNG/250px-Bulma_Lithograph.PNG"
      },
    ];
  }

}
