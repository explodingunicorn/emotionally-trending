import * as Realm from 'realm-web';

type Document = globalThis.Realm.Services.MongoDB.Document;

export interface State extends Document {
	updated: number;
	avgHistory: { score: number; time: number }[];
	[key: string]: any;
}

export interface Tweet {
	id: number;
	sentiment: {
		score: number;
		comparitive: number;
		positive: string[];
		negative: string[];
	};
	text: string;
	createdAt: string;
	user: {
		id: number;
		name: string;
		screenName: string;
	};
	retweetCount: number;
	favoriteCount: number;
	[key: string]: any;
}

export interface WordStructure {
	word: string;
	count: number;
	[key: string]: any;
}

export interface ScoreStructure {
	scoreAvg: number;
	time: number;
	[key: string]: any;
}

export interface Trend {
	id: string;
	name: string;
	positiveTweets: Tweet[];
	negativeTweets: Tweet[];
	scoreAvg: number;
	comparativeAvg: number;
	positiveWords: WordStructure[];
	negativeWords: WordStructure[];
	scoreAvgHistory: ScoreStructure[];
	createdAt: number;
	tweetVolume: number;
	[key: string]: any;
}
