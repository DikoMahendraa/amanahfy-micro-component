import { addDays, addWeeks, addMonths, format } from "date-fns";

export type Frequency = "daily" | "weekly" | "monthly" | "jummah";

/**
Converts a date string into a human-readable "time ago" format.
@param {string} date - The date string to convert to a "time ago" format
@param {boolean} [useShortName] - Optional flag to use abbreviated unit names
@returns {string} A human-readable string representing how long ago the date occurred

@example
// Returns "1 day ago"
timeAgoFromNow('2024-04-14T10:00:00Z')

// Returns "1d ago" (with short name)
timeAgoFromNow('2024-04-14T10:00:00Z', true)

// Returns "just now" for very recent dates
timeAgoFromNow('2025-04-15T12:30:00Z')

// Returns larger units for older dates
timeAgoFromNow('2024-01-15T12:30:00Z') // "3 months ago"
*/

export function timeAgoFromNow(date: string, useShortName?: boolean): string {
  const now = new Date();
  const diffDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - diffDate.getTime()) / 1000);

  const units = [
    { name: "year", short_name: "y", seconds: 31536000 },
    { name: "month", short_name: "mt", seconds: 2592000 },
    { name: "day", short_name: "d", seconds: 86400 },
    { name: "hour", short_name: "h", seconds: 3600 },
    { name: "minute", short_name: "m", seconds: 60 },
    { name: "second", short_name: "s", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return interval === 1
        ? `${interval}${useShortName ? unit.short_name : ` ${unit.name}`} ago`
        : `${interval}${
            useShortName ? `${unit.short_name} ` : ` ${unit.name}s `
          }ago`;
    }
  }

  return "just now";
}

export function getNextChargeDateFormatted(
  currentDate: Date,
  frequency: Frequency
): string {
  let nextDate: Date;

  switch (frequency) {
    case "daily":
      nextDate = addDays(currentDate, 1);
      break;
    case "weekly":
      nextDate = addWeeks(currentDate, 1);
      break;
    case "monthly":
      nextDate = addMonths(currentDate, 1);
      break;
    case "jummah":
      // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 5 = Friday)
      // eslint-disable-next-line no-case-declarations
      const currentDay = currentDate.getDay();

      if (currentDay === 5) {
        // If today is Friday, move to next Friday
        nextDate = addDays(currentDate, 7);
      } else if (currentDay < 5) {
        // If before Friday, calculate days until Friday
        nextDate = addDays(currentDate, 5 - currentDay);
      } else {
        // If after Friday, calculate days until next Friday
        nextDate = addDays(currentDate, 5 + (7 - currentDay));
      }
      break;
    default:
      nextDate = currentDate;
  }

  return format(nextDate, "dd MMMM yyyy");
}
