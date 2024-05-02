export const convertViewsToShortForm = (views) => {
    if (views >= 1000000000) {
        return (views / 1000000000).toFixed(1) + "B";
    } else if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + "K";
    } else {
        return views.toString();
    }
}
