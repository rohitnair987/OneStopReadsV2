import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
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
  mongoRecordId: string;
  formdata: FormGroup;
  
  constructor(private router: Router,
      private sourceService: SourceService) { }

  ngOnInit() {
    this.newSource();
  }

  newSource() {
    this.source = new Source();
  }

  onSubmit() { 
    this.showErrorMsg = false;

    //this.source.lastModifiedBy = ;

    this.sourceService.addSource(this.source)
      .subscribe(
        response => {
          this.mongoRecordId = response._id;
        },
        error => {
          this.mongoRecordId = "";
          this.showErrorMsg = true;
        }
      );
    
  }

}
