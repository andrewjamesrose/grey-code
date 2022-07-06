import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-clipboard-io',
  templateUrl: './clipboard-io.component.html',
  styleUrls: ['./clipboard-io.component.scss']
})
export class ClipboardIoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  readFromClipboardPromise(): void {

    let _readString: string = "reading from clipboard"

    // from: https://stackoverflow.com/questions/6413036/get-current-clipboard-content
    // this uses promise syntax to handle the async call to the clipboard
    navigator.clipboard.readText()
      .then(text => {
        console.log('Pasted content: ', text);
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });

      console.log(_readString)
    }


  writeToClipboardPromise(): void {

    let _outputString: string = "writing words to the clipboard: " + Math.random().toString()

    navigator.clipboard.writeText(_outputString)
      .then( () => {
        console.log('Wrote content: ', _outputString);
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });

    console.log(_outputString)
  }


  // Using RxJS observables instead of the promise syntax:
  // https://stackoverflow.com/questions/39319279/convert-promise-to-observable
  // https://trungk18.com/experience/convert-promise-to-observable/

  // clipBoardRead$!: Observable <string>

  promFromObs():  Observable <void|string> {
    let test = navigator.clipboard.readText()
                  .then(text => {
                  // console.log('Pasted content: ', text);
                  return text
                })
                .catch(err => {
                  // console.error('Failed to read clipboard contents: ', err);
                  return err
                });

    return from(test)
  }




  readFromClipboardRxJS(): void {
    console.log("RX JS Read")
    this.promFromObs().subscribe({
      next(data) {
        // console.log("fresh data: " + data)
        if(data) {parseTSVToJSON(data)}
      },
      error(msg) {
        console.log("there was an error")
      }
    }
    )
  }

  writeToClipboardRxJS(): void {
    console.log("RX JS Write")
  }

}


// ######## use map instead of for? #########

function parseTSVToJSON(inputText?: string): void {
  if(inputText) {
    let rows: string[] = inputText.split("\r\n")
    let outputArray: object[] = []
    for(let i=0; i<rows.length; i++) {

      let rowObj: Record<string, string> = {}
      let currentRow=rows[i].split("\t")

      for(let j: number = 0; j<currentRow.length; j++) {

        rowObj[j.toString()] = currentRow[j]

      }

      outputArray.push(rowObj)
    }

    console.log(outputArray)
  } else {
    console.log("blank")
  }
}


