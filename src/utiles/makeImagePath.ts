export const makePath = (id: string, format?: string) => {
    const newFormat = format ? format : "original";

    return `https://image.tmdb.org/t/p/${newFormat}/${id}`;
}