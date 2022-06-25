import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-backend-http-test',
  templateUrl: './backend-http-test.component.html',
  styleUrls: ['./backend-http-test.component.scss']
})
export class BackendHttpTestComponent implements OnInit {
  foods$ = this.httpInstance.get<any[]>('/api/resource_1');

  constructor(private httpInstance: HttpClient) { }

  ngOnInit(): void {
  }

}
