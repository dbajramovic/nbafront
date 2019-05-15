import { Cumulativestat } from './cumulativestat';

export class Stats {
	stats: Cumulativestat[] = [];
	start: string;
	end: string;
	teamsInPeriod: string;
	cumulativeStats: Cumulativestat;
	cumulativeStatsAdjusted: Cumulativestat;
}