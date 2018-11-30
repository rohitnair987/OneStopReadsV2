import { Component, OnInit } from '@angular/core';
import { Source } from "src/models/source";
import { SourceService } from "src/app/source/source.service";
import { News } from "src/models/news";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  pageTitle: string = 'News';
  sources: Source[];
  displayedSources: Source[];
  hideImages = false;
  hideDescription = false;
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
                if (res.status.toLowerCase() === "ok") {
                  source.news = new Array<News>();
                  var news = [];
                  if (res.articles) { //bbc
                    news = res.articles;
                  } else if (res.results) { //nyt
                    news = res.results;
                  }

                  news.forEach(n => {
                    if (n.title) {
                      var newsArticle = new News();
                      newsArticle.title = n.title;
                      newsArticle.description = n.description || n.abstract;
                      newsArticle.url = n.url;
                      newsArticle.imgUrl = n.urlToImage;
  
                      source.news.push(newsArticle);
                    }
                  });
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
