import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Source } from "src/models/source";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SourceService } from "src/app/source/source.service";

@Component({
  selector: 'app-source-add',
  templateUrl: './source-add.component.html',
  styleUrls: ['./source-add.component.css']
})

export class SourceAddComponent implements OnInit {
  pageTitle = 'Add Source';
  showErrorMsg = false;
  source: Source;
  formdata: FormGroup;
  
  constructor(private router: Router,
      private sourceService: SourceService,
      private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    if (id == null) {
      this.pageTitle = 'Add Source';
      this.source = new Source();
    } else {
      this.pageTitle = 'Edit Source';
      this.sourceService.getSource(id)
        .subscribe(
          source => {
            this.source = source;
          },
          error => this.showErrorMsg = true
        );
    }
  }

  onSubmit() { 
    this.showErrorMsg = false;

    this.sourceService.upsertSource(this.source)
      .subscribe(
        source => {
          this.source = source;
          this.router.navigate(['/sources', source._id]);
        },
        error => {
          this.showErrorMsg = true;
        }
      );
    
  }

}
