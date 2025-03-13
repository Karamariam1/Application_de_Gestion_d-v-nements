package com.project.event_management.services;

import java.util.List;

import com.project.event_management.entities.Event;

public interface IEventService {

    public List<Event> getAllEvents(); 
    public Event getEventById(Long id); 
    public Event addEvent(Event event); 
    public void deleteEvent(Long id); 
    public Event updateEvent(Event event, Long id); 

}
