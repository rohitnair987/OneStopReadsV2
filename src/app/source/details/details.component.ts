import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ISource } from 'src/models/source';
import { SourceService } from '../source.service';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pageTitle: string = 'Source Details';
  source: ISource;
  errorMsg: string;

  constructor(private route: ActivatedRoute,
    private sourceService: SourceService,
    private router: Router) { }

  ngOnInit() {

    // The '+' converts string to number
    //let id = +this.route.snapshot.paramMap.get('id');
    let id = this.route.snapshot.paramMap.get('id');

    this.pageTitle += `: ${id}`;

    // Create a getSource(id) on the api side once mongodb's set up
    this.sourceService.getSources()
      .subscribe(
        sources => this.source = sources[0],
        error => this.errorMsg = <any>error // <-- failure
      );
  }

  onBack(): void {
    // Navigate to source list.
    this.router.navigate(['/sources']);
  }

}
