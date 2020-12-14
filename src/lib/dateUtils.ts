export function dateToYyyymmddString(d: Date | null): string {
  if (!d) return '';

  const year = d.getFullYear().toString();
  const month = d.getMonth() + 1;
  const monthString: string =
    month < 10 ? '0' + month.toString() : month.toString();
  const day = d.getDate();
  const dayString = day < 10 ? '0' + day.toString() : day.toString();

  return ''.concat(year).concat(monthString).concat(dayString);
}
