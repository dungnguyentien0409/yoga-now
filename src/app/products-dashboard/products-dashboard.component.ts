import { Component, OnInit } from '@angular/core';
import { ProductsColumns, ProductsDisplayColumns, Prices } from './products-dashboard.config';
import { LoggerService } from 'app/services/logger.service';
import { DeviceService } from 'app/services/device.service';
import { BaseComponent } from 'app/layouts/admin-layout/base.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'products-dashboard',
    templateUrl: './products-dashboard.component.html',
    styleUrls: ['./products-dashboard.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class ProductsDashboardComponent extends BaseComponent{
    cols = ProductsColumns;
    displayCols = ProductsDisplayColumns;
    prices = Prices;
    mode = 'Normal';

    constructor(logger: LoggerService,
        deviceService: DeviceService,
        confirmationService: ConfirmationService,
        messageService: MessageService) {
        super(logger, deviceService, confirmationService, messageService)
    }

    ngOnInit() {
        if (this.deviceService.isMobile()) {
            this.cols.pop();
        }

        this.logger.prefix = 'Products Dashboard';
    }

    onRowSelect() {
        
    }
}