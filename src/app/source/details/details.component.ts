import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Source } from 'src/models/source';
import { SourceService } from '../source.service';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  pageTitle: string = 'Source Details';
  source: Source;
  errorMsg: string;

  constructor(private route: ActivatedRoute,
    private sourceService: SourceService,
    private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.sourceService.getSource(id)
      .subscribe(
        source => this.source = source,
        error => this.errorMsg = <any>error
      );
  }

  onBack(): void {
    this.router.navigate(['/sources']);
  }

}
