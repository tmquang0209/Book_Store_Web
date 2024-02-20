export const fullDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        // weekday: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
};

export const shortDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        // weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const dateAndTime = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        // weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}