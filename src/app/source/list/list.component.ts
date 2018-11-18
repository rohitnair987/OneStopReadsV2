import { Component, OnInit } from '@angular/core';
import { SourceService } from '../source.service';
import { Source } from "src/models/source";

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

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

  filteredSources: Source[];
  sources: Source[];
  errorMsg: string;
  
  constructor(private sourceService: SourceService) { }

  ngOnInit() {
    this.sourceService.getSources()
      .subscribe(
        sources => { // <-- success
          this.sources = sources;
          this.filteredSources = this.sources;
        },
        error => this.errorMsg = <any>error // <-- failure
      );
  }

  toggleVisibilityOfImgs(): void {
    this.showImgs = !this.showImgs;
  }

  filter(filterText: string) : Source[] {
    filterText = filterText.toLocaleLowerCase();

    return this.sources.filter((src: Source) =>
      src.name.toLocaleLowerCase().indexOf(filterText) !== -1
    );
  }

  removeSource(sourceMongoId: string) {
    this.sourceService.deleteSource(sourceMongoId)
      .subscribe(
        res => {
          console.log(res);
          this.filteredSources = this.filteredSources.filter(src => src._id != sourceMongoId);
          this.sources = this.sources.filter(src => src._id != sourceMongoId);
        },
        error => this.errorMsg = <any>error
      );
  }

}
