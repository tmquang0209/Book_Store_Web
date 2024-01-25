export const fullDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        // weekday: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
};
