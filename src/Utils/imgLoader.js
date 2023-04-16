export const imgLoader = ({ iconHref, iconPlaceholder }) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(iconHref);
        };
        // img.onerror = () => {
        //     reject(iconPlaceholder);
        // };
        img.src = iconHref;
    });
};

