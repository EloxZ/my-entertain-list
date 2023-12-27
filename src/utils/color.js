export function getScoreColor(score) {
    return (score)? hslColorPer(score * 10, 0, 100) : "black";
}

function hslColorPer(percent, start, end) {
    const a = percent / 100,
        b = (end - start) * a,
        c = b + start;

    return 'hsl('+c+', 100%, 35%)';
}