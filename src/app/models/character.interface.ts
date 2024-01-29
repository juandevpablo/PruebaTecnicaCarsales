import { EpisodeInterface } from "./episode.interface";
import { InfoInterface } from "./info.interface";
import { NameUrlInterface } from "./name-url.interface";

// AfcCorpRecepcionModel
export interface CharacterInterface {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: NameUrlInterface;
    location: NameUrlInterface;
    image: string;
    episode: string[];
    url: string;
    created: string;
}
