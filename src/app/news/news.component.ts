import { Component, OnInit } from '@angular/core';
import { Source } from "src/models/source";
import { SourceService } from "src/app/source/source.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  pageTitle: string = 'News';
  sources: Source[];
  displayedSources: Source[];
  errorMsg: string;
  imgWidth: number = 50;
  imgHeight: number = 50;
  unsubscribeList = [];

  constructor(private sourceService: SourceService) { }
  
  ngOnInit() {
    this.sourceService.getSources()
      .subscribe(
        sources => {
          sources.forEach(source => {
            this.sourceService.getNews(source.url)
              .subscribe(res => {
                if (res.status === "ok") {
                  source.news = res.articles.map(article => article.title);
                }
                else {
                  source.news = [];
                }
              })
          });

          this.sources = sources;
          this.displayedSources = this.sources;
        },
        error => this.errorMsg = <any>error // <-- failure
      );
  }

  unsubscribe(sourceName) {
    if (!this.unsubscribeList.includes(sourceName)) {
      this.unsubscribeList.push(sourceName);
    }
    this.displayedSources = this.displayedSources.filter(s => !this.unsubscribeList.includes(s.name));
  }

  reset() {
    this.unsubscribeList = [];
    this.displayedSources = this.sources;
  }

}
