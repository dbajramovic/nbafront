import { PlayerSalaryPair } from "./PlayerSalaryPair";

export class GamePriceStructure {
    year:string;
    teamPriceMap:PlayerSalaryPair[];
    homeTeamPrice:PlayerSalaryPair[];
    visitorTeamPrice:PlayerSalaryPair[];
}