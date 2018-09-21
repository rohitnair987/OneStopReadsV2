import { Component, OnInit } from '@angular/core';
import { ISource } from '../../../models/source';
import { SourceService } from '../source.service';

@Component({
  selector: 'source-list',
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

  filteredSources: ISource[];
  sources: ISource[];
  errorMsg: string;
  
  constructor(private sourceService: SourceService) { 
  }

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

  filter(filterText: string) : ISource[] {
    filterText = filterText.toLocaleLowerCase();
    return this.sources.filter((src: ISource) =>
      src.name.toLocaleLowerCase().indexOf(filterText) !== -1
    );
  }

}
