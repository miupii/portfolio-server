export default interface Game {
    id: number;
    title: string;
    ranking: number;
    project: string;
    date_submitted: Date;
    total_entries: number;
    engine: string;
    jam: string
}