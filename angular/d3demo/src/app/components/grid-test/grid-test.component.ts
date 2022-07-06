import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GetContextMenuItemsParams, GridReadyEvent, MenuItemDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid-test',
  templateUrl: './grid-test.component.html',
  styleUrls: ['./grid-test.component.scss']
})
export class GridTestComponent implements OnInit {

  ngOnInit(): void {
  }

   // Each Column Definition results in one Column.
 public columnDefs: ColDef[] = [
  { field: 'make'},
  { field: 'model'},
  { field: 'price' }
];

// DefaultColDef sets props common to all Columns
public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
};

// Data that gets displayed in the grid
public rowData$!: Observable<any[]>;

// For accessing the Grid's API
@ViewChild(AgGridAngular) agGrid!: AgGridAngular;

constructor(private http: HttpClient) {}

// Example load data from sever
onGridReady(params: GridReadyEvent) {
  this.rowData$ = this.http
    .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
}

// Example of consuming Grid Event
onCellClicked( e: CellClickedEvent): void {
  console.log('cellClicked', e);
}

// Example using Grid's API
clearSelection(): void {
  this.agGrid.api.deselectAll();
}

getContextMenuItems(
  params: GetContextMenuItemsParams
): (string | MenuItemDef)[] {
  var result: (string | MenuItemDef)[] = [
    {
      // custom item
      name: 'Alert ' + params.value,
      action: () => {
        window.alert('Alerting about ' + params.value);
      },
      cssClasses: ['redFont', 'bold'],
    },
    {
      // custom item
      name: 'Always Disabled',
      disabled: true,
      tooltip:
        'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
    },
    {
      name: 'Country',
      subMenu: [
        {
          name: 'Ireland',
          action: () => {
            console.log('Ireland was pressed');
          },
          icon: createFlagImg('ie'),
        },
        {
          name: 'UK',
          action: () => {
            console.log('UK was pressed');
          },
          icon: createFlagImg('gb'),
        },
        {
          name: 'France',
          action: () => {
            console.log('France was pressed');
          },
          icon: createFlagImg('fr'),
        },
      ],
    },
    {
      name: 'Person',
      subMenu: [
        {
          name: 'Niall',
          action: () => {
            console.log('Niall was pressed');
          },
        },
        {
          name: 'Sean',
          action: () => {
            console.log('Sean was pressed');
          },
        },
        {
          name: 'John',
          action: () => {
            console.log('John was pressed');
          },
        },
        {
          name: 'Alberto',
          action: () => {
            console.log('Alberto was pressed');
          },
        },
        {
          name: 'Tony',
          action: () => {
            console.log('Tony was pressed');
          },
        },
        {
          name: 'Andrew',
          action: () => {
            console.log('Andrew was pressed');
          },
        },
        {
          name: 'Kev',
          action: () => {
            console.log('Kev was pressed');
          },
        },
        {
          name: 'Will',
          action: () => {
            console.log('Will was pressed');
          },
        },
        {
          name: 'Armaan',
          action: () => {
            console.log('Armaan was pressed');
          },
        },
      ],
    },
    'separator',
    {
      // custom item
      name: 'Windows',
      shortcut: 'Alt + W',
      action: () => {
        console.log('Windows Item Selected');
      },
      icon:
        '<img src="https://www.ag-grid.com/example-assets/skills/windows.png" />',
    },
    {
      // custom item
      name: 'Mac',
      shortcut: 'Alt + M',
      action: () => {
        console.log('Mac Item Selected');
      },
      icon:
        '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
    },
    'separator',
    {
      // custom item
      name: 'Checked',
      checked: true,
      action: () => {
        console.log('Checked Selected');
      },
      icon:
        '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
    },
    'copy',
    'separator',
    'chartRange',
  ];
  return result;

}

}


function createFlagImg(flag: string) {
  return (
    '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' +
    flag +
    '.png"/>'
  );
}

