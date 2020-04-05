import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LoggerService } from 'app/services/logger.service';
import { DeviceService } from 'app/services/device.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';

export abstract class BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  protected subscriptions: Subscription[] = [];
  public isLoading: boolean = false;

  constructor(protected logger: LoggerService,
    protected deviceService: DeviceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.onInit();
  }

  ngAfterViewInit(): void {
    this.onAfterViewInit();
  }

  ngOnDestroy(): void {
    this.onUnsubscribe();
    this.onDestroy();
  }

  onUnsubscribe(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  protected onInit(): void {
    // virtual method
  }

  protected onAfterViewInit(): void {
    // virtual method
  }

  protected onDestroy(): void {
    // virtual method
  }

  protected alignScrollHeader<T>(table: Table, itemsSource: T[]): void {
    if (table) {
      table.tableService.onValueChange(itemsSource);
    }
  }

  protected showError(message) {
    this.messageService.add({ severity: 'error', summary: 'Error Message', detail: message });
  }

  protected showErrors(messages: any[]) {
    if (messages instanceof Array) {
      this.messageService.addAll(messages.map((message) => ({
        severity: 'error',
        summary: 'Error Message',
        detail: message
      })));
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: messages });
    }
  }

  protected showSuccess(message) {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: message });
  }

  protected handleError(error) {
    this.hideWaiting();
    if (error instanceof HttpErrorResponse && error.error.statusCode === 400) {
      this.showErrors([...error.error.message]);
      return;
    } else if (error instanceof HttpErrorResponse && error.error.statusCode === 404) {
      this.showError(error.error.message);
      return;
    } else if (error instanceof Error) {
      this.showError([error.message])
      return;
    }

    this.showError('Something went wrong.\nPlease contact admin');
  }

  protected showWaiting() {
    this.isLoading = true;
  }

  protected hideWaiting() {
    this.isLoading = false;
  }

  protected confirmOperation(message: string, header: string, acceptCallback: () => void) {
    this.confirmationService.confirm({
      header: header,
      message: message,
      accept: () => {
        acceptCallback();
      }
    });
  }
}
