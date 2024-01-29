import { EpisodeInterface } from "./episode.interface";
import { InfoInterface } from "./info.interface";

// AfcCorpRecepcionModel
export interface ResponseInterface {
    info: InfoInterface;
    results: EpisodeInterface[];
}
