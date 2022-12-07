import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { SearchService } from '../../services/search.service';
import * as _ from 'lodash';


interface City {
  name: string;
  code: string;
}

interface Country {
  name: string;
  code: string;
}


@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})



export class SourcesComponent implements OnInit {

  @Output() onChange = new EventEmitter();
  selectedSources = [];
  groupedSources: any;


  constructor(private _searchService: SearchService) {





  }



  ngOnInit(): void {
    this._searchService.getSources().then((r: any) => {
      const items = r.body
      const m = _.mapValues(items, (item: any, key: any) => {
        return { label: item.human, value: key }
      });
      this.groupedSources = _.flatMap(m)
    })
  }

  setSources(values: any) {
    this._searchService.setSources(values.value);
    this.onChange.emit(values.value);
  }



}
