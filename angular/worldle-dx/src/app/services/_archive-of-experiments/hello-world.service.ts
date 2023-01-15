import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

    constructor() { }

    private code$: BehaviorSubject<string> = new BehaviorSubject('')

    getCode(): Observable<string> {
        return this.code$.asObservable()
    }


    setCode(inputCode: string): void {
        this.code$.next(inputCode)
    }
}
