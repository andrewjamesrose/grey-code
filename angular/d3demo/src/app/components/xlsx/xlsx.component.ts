import { Component, OnInit } from '@angular/core';
import { read, utils, writeFileXLSX } from "xlsx";

@Component({
  selector: 'app-xlsx',
  templateUrl: './xlsx.component.html',
  styleUrls: ['./xlsx.component.scss']
})
export class XlsxComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
  }

  localFile: File | null | undefined = null;
  jsonObjectArray: object[] = []
  columnHeaders: string[] = []

  handleFileInput($event: Event) {
    console.log((<HTMLInputElement>($event.target)).files)
    this.localFile = (<HTMLInputElement>($event.target)).files?.item(0)
    }

    async parseJson(): Promise<void>{
        if(this.localFile){
            const data = await this.localFile.arrayBuffer();
            const workbook = read(data);
            const wb = workbook.Sheets["Sheet1"]
            // console.log(wb)
            this.jsonObjectArray = <object[]>utils.sheet_to_json(wb)
            console.log(this.jsonObjectArray)
        }
    }

    async testFunction(): Promise<void> {
        this.parseJson().then(()=>
            this.getColumnHeaders()
        )
    }
        


    getColumnHeaders(): void{
        if(this.jsonObjectArray.length>0) {
            this.columnHeaders = Object.keys(this.jsonObjectArray[0])
            console.log(this.columnHeaders)
        }

    }
    
}
