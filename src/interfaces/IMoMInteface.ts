export interface IGetLandPlotsResponse {
	landPlots: ILandPlot[];
}

export interface ILandPlot {
	availableSpace: number;
	buildingsData: IBuildingData[];
	isBundle: boolean;
	price: IAtomicPrice;
	rarity: string | null;
	saleId: number;
	seller: string;
}

export interface IBuildingData{
	building: string;
	edition: string;
	quantity: number;
	rarityLevel: IBuildingRarityLevel;
}

export interface IBuildingRarityLevel {
	rarity: string;
	level: number;
}

export interface IAtomicPrice {
	amount: number;
	symbol: string;
}