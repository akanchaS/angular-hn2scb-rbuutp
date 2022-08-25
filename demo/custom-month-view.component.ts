import {Component} from '@angular/core';
import { CalendarMonthViewComponent } from 'angular-calendar';

@Component({
  selector: 'custom-month-view',
  template: `
    <div class="cal-month-view">
      <div class="cal-cell-row cal-header">
        <div
          class="cal-cell"
          *ngFor="let day of columnHeaders"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [ngClass]="day.cssClass"
        >
          {{ day.date | calendarDate: 'monthViewColumnHeader':locale }}
        </div>
        <div
          class="cal-cell"
        >
          Week total
        </div>
      </div>
      <div class="cal-days">
        <div *ngFor="let rowIndex of view.rowOffsets; trackByIndex">
          <div class="cal-cell-row">
            <mwl-calendar-month-cell
              *ngFor="
                let day of (view.days
                  | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek);
                trackBy: trackByDate
              "
              [ngClass]="day?.cssClass"
              [day]="day"
              [openDay]="openDay"
              [locale]="locale"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipTemplate]="tooltipTemplate"
              [customTemplate]="cellTemplate"
              (mwlClick)="dayClicked.emit({ day: day })"
              (highlightDay)="toggleDayHighlight($event.event, true)"
              (unhighlightDay)="toggleDayHighlight($event.event, false)"
              mwlDroppable
              dragOverClass="cal-drag-over"
              (drop)="
                eventDropped(
                  day,
                  $event.dropData.event,
                  $event.dropData.draggedFrom
                )
              "
              (eventClicked)="eventClicked.emit({ event: $event.event })"
            >
            </mwl-calendar-month-cell>
            <div class="cal-cell cal-day-cell">
              Total here
            </div>
          </div>
          <mwl-calendar-open-day-events
            [isOpen]="openRowIndex === rowIndex"
            [events]="openDay?.events"
            [customTemplate]="openDayEventsTemplate"
            [eventTitleTemplate]="eventTitleTemplate"
            [eventActionsTemplate]="eventActionsTemplate"
            (eventClicked)="eventClicked.emit({ event: $event.event })"
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="
              eventDropped(
                openDay,
                $event.dropData.event,
                $event.dropData.draggedFrom
              )
            "
          >
          </mwl-calendar-open-day-events>
        </div>
      </div>
    </div>
  `
})
export class CustomMonthView extends CalendarMonthViewComponent 
{}