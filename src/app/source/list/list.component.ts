import { Component, OnInit } from '@angular/core';
import { ISource } from '../../../models/source';
import { SourceService } from '../source.service';

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
  sources: ISource[];
  
  constructor(private sourceService: SourceService) { 
  }

  ngOnInit() {
    this.sources = this.sourceService.getSources();
    this.filteredSources = this.sources;
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
