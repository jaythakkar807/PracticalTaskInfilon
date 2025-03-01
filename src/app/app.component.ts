import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { TramService } from './services/tram.service';

interface Departure {
  destination: string;
  direction_code: number;
  display: string;
  line: { designation: string };
  time: number;
  state: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  departures = signal<Departure[]>([]);


  constructor(private tramService: TramService) {
    setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnInit() {
    this.fetchDepartures();
  }

  fetchDepartures() {
    this.tramService.getDepartures()
      .subscribe((data) => {
        const filteredDepartures = data.departures
          .filter((departure: any) =>
            departure.line.designation === '30' &&
            departure.stop_area.name === 'Luma' &&
            this.isHeadingTowardsLinde(departure)
          )
          .map((d: any) => ({
            line: { designation: d.line.designation },
            destination: d.destination,
            time: d.display == 'Nu' ? 120 : this.convertDisplayToSeconds(d.display),
            state: d.state,
            display: d.display
          }));
        this.departures.set(filteredDepartures);
      });
  }

  convertDisplayToSeconds(display: string): number {
    const match = display.match(/(\d+)\s*min/);
    if (match) {
      return parseInt(match[1], 10) * 60;
    }
    return 0; 
  }

  updateCountdown() {
    this.departures.update((departs: any) =>
      departs
        .map((d: any) => ({ ...d, time: Math.max(d.time - 1, 0) }))
        .filter((d: any) => d.time > 0)
    );
  }

  formatTime(seconds: number): string {
    if (seconds <= 0) return '🚋 Now';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return minutes > 0 ? `${minutes} min ${secs} sec` : `${secs} sec`;
  }

  getStatusClass(state: string): string {
    return state === 'EXPECTED' ? 'expected' : 'delayed';
  }

  isHeadingTowardsLinde(departure: Departure): boolean {
    return departure.direction_code === 1 && departure.destination !== 'Luma';
  }
}
