export default interface Game {
    id: number;
    title: string;
    ranking: number;
    projectType: string;
    date: Date;
    totalEntries: number;
    engine: string;
    jam: string
}