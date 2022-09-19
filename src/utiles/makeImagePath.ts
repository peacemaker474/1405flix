export const makePath = (id: string, format?: string) => {
    const newFormat = format ? format : "original";

    if (!id) return `https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif`;

    return `https://image.tmdb.org/t/p/${newFormat}/${id}`;
}