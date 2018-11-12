import { Component, OnInit } from '@angular/core';
import { ISource } from "src/models/source";
import { SourceService } from "src/app/source/source.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  pageTitle: string = 'News';
  sources: ISource[];
  errorMsg: string;
  imgWidth: number = 50;
  imgHeight: number = 50;

  constructor(private sourceService: SourceService) { }

  ngOnInit() {
    
    this.sourceService.getSources()
    .subscribe(
      sources => this.sources = sources,
      error => this.errorMsg = <any>error // <-- failure
    );

  }

}
