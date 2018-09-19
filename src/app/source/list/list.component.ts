import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'source-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // To-do: Replace data-type with class name later
  // To-do: fetch data from the db
  sources: string[] = [ "bbc", "nytimes", "google news" ];

  constructor() { }

  ngOnInit() {
  }

}
