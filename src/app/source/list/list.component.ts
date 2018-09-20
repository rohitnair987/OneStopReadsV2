import { Component, OnInit } from '@angular/core';
import { ISource } from '../../../models/source';

@Component({
  selector: 'source-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // To-do: Replace data-type with class name later
  // To-do: fetch data from the db

  imgWidth: number = 50;
  imgHeight: number = 50;
  showImgs: boolean = true;
  
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredSources = this.listFilter ? this.filter(this.listFilter) : this.sources;
  }

  filteredSources: ISource[];
  sources: ISource[] = [
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
  
  constructor() { 
    this.filteredSources = this.sources;
    this.listFilter = '';
  }

  ngOnInit() {
  }

  toggleVisibilityOfImgs(): void {
    this.showImgs = !this.showImgs;
  }

  filter(filterText: string) : ISource[] {
    filterText = filterText.toLocaleLowerCase();
    return this.sources.filter((src: ISource) =>
      src.name.toLocaleLowerCase().indexOf(filterText) !== -1
    );
  }

}
