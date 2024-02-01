const showStatus = ["plan", "watching", "completed", "hold", "dropped"];
const movieStatus = ["plan", "watched", "dropped"];

const statusMap = {
    "plan": "Planned To Watch",
    "watching": "Watching",
    "completed": "Completed",
    "hold": "On Hold",
    "dropped": "Dropped",
    "watched": "Watched"
}

export {
    showStatus,
    movieStatus,
    statusMap
}