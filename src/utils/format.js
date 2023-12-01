export function minsToHours(mins) {
    if (!mins) return undefined;
    const hours = mins/60;
    const fhours = Math.floor(hours);
    const minutes = Math.floor((hours-fhours) * 60);

    return ((fhours>0)? (fhours + "h ") : "") + minutes + "m";
}