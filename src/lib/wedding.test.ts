import { describe, expect, it } from "vitest";
import { celebrationDays, getTimeLeft, storyMilestones, wedding } from "./wedding";

describe("wedding dates and milestones", () => {
  it("holds celebrations on January 28 and 29, 2027", () => {
    expect(celebrationDays.map(day => day.date)).toEqual(["2027-01-28", "2027-01-29"]);
  });
  it("counts down to Saptapadi at 9 AM in Pune, independently of guest timezone", () => {
    expect(new Date(wedding.ceremonyAt).toISOString()).toBe("2027-01-29T03:30:00.000Z");
    expect(getTimeLeft(new Date("2027-01-28T03:30:00Z"))).toEqual({ days: 1, hours: 0, minutes: 0, seconds: 0 });
    expect(getTimeLeft(new Date("2027-01-30T03:30:00Z"))).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
  it("preserves the supplied story milestone years", () => {
    expect(storyMilestones.map(event => event.year)).toEqual(["2023", "2024 & 2025", "2026", "2027"]);
  });
});

describe("celebration times", () => {
  it.each([
    [0, "Engagement", "9:00 AM"],
    [0, "Haldi Carnival", "2:00 PM"],
    [0, "Sangeet", "7:00 PM"],
    [1, "Saptapadi", "9:00 AM"],
    [1, "Baarat", "5:00 PM"],
    [1, "Reception", "7:00 PM"],
  ] as const)("day %s: %s starts at %s", (day, title, time) => {
    expect(celebrationDays[day].events.find(event => event.title === title)?.time).toBe(time);
  });
});
