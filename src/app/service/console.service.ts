import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  constructor() { }

  private debugMode: boolean = true;

  log(...data: any[]): void {
    if (this.debugMode) {
      console.log(...data);
    }
  }

  trace(...data: any[]): void {
    if (this.debugMode) {
      console.trace(...data);
    }
  }

  info(...data: any[]): void {
    if (this.debugMode) {
      console.info(...data);
    }
  }

  warn(...data: any[]): void {
    if (this.debugMode) {
      console.warn(...data);
    }
  }

  error(...data: any[]): void {
    console.error(...data);
  }

  debug(...data: any[]): void {
    if (this.debugMode) {
      console.debug(...data);
    }
  }

  assert(expression: boolean, ...data: any[]): void {
    if (this.debugMode) {
      console.assert(expression, ...data);
    }
  }

  table(data: any, properties?: string[]): void {
    if (this.debugMode) {
      console.table(data, properties);
    }
  }

}