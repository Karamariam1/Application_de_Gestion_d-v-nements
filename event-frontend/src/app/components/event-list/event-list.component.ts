import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event-service.service';  // Adjust path if necessary
import { Event } from '../../models/event';  // Adjust path if necessary
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  newEvent: Event = { id: 0, title: '', description: '', startDate: '', endDate: '', location: '' };

  constructor(private eventService: EventService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
    });
  }

  formatDateForBackend(date: string): string {
    // Ensure the date is in 'yyyy-MM-ddTHH:mm' format
    const dateObj = new Date(date);
    return dateObj.toISOString().slice(0, 16);  // Format as yyyy-MM-ddTHH:mm
  }
  
  addEvent(): void {
    this.newEvent.startDate = this.formatDateForBackend(this.newEvent.startDate);
    this.newEvent.endDate = this.formatDateForBackend(this.newEvent.endDate);
  
    // Now send the event object to the backend
    this.eventService.addEvent(this.newEvent).subscribe(
      (event: Event) => {
        console.log("Event added:", event);
        this.events.push(event);
        this.resetNewEvent();
      },
      (error) => {
        console.error("Error adding event:", error);
        alert("Failed to add event. Please try again.");
      }
    );
  }
  
  

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter(event => event.id !== id);
    });
  }

  private resetNewEvent(): void {
    this.newEvent = { id: 0, title: '', description: '', startDate: '', endDate: '', location: '' };
  }
}
