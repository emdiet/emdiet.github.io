import { Component, OnInit } from '@angular/core';
import {Analyzer} from '../assets/analyzer';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {

  private incoming: string;
  private german = Analyzer.german();
  constructor() {
  }
  analyze(text) {
    return this.german.analyze(text);
  }
  ngOnInit() {
  }

}
