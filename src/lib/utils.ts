export const rupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');
export const calcAge = (dob: string) =>
  dob ? Math.max(0, Math.floor((Date.now() - new Date(dob).getTime()) / 31557600000)) : 0;
export const mapsUrl = (lat: number, lng: number) => `https://www.google.com/maps?q=${lat},${lng}`;
export const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');
