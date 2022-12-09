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
  @Output() doSearch = new EventEmitter();
  @Output() toggleJsonDialog = new EventEmitter();
  selectedSources = ["allekabels.nl", "partsnl.nl"];
  s: any;
  groupedSources: { label: any; value: any; }[] | undefined;






  constructor(private _searchService: SearchService) {





  }



  ngOnInit(): void {
    const context = this;

    this._searchService.getSources().then((r: any) => {
      const items = r.body
      const m = _.mapValues(items, (item: any, key: any) => {
        return { label: item.human, value: key }
      });
      this.groupedSources = _.flatMap(m)
      context._searchService.setSources(this.selectedSources)

      this.onChange.emit(context._searchService.sources)
    })

  }

  setSources(values: any) {
    this._searchService.setSources(values.value);
    this.onChange.emit(values.value);
    if (values.value.length > 0) {
      this.doSearch.emit(values.value)
    }
  }

  emitToggleJsonDialog() {
    this.toggleJsonDialog.emit();
  }





}
