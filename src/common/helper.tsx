import { IBuildingRarityLevel, IDropDownValueArray, ILandPlot, IMoMAutocompleteOption } from '../interfaces/IMoMInteface';
import { MenuItem } from "@mui/material";
import { MoMFilterTypeEnum, MoMRarityEnum } from './enum';

export const getBuildingChipColorByRarity = (rarityAndLevel: IBuildingRarityLevel): string =>{
	switch(rarityAndLevel.rarity){
		case "C":
			return "#6e6e6e";
		case "U":
			return "#03593c";
		case "R":
			return "#162bc4";
		case "E":
			return "#7749a7";
		case "L":
			return "#edc449";
		case "M":
			return "#5d001f";
		case "S":
			return "#ae0070";
		default:
			return "white";
	}
}

export const getLandChipColorByRarity = (rarity: string): string | null => {
	switch(rarity){
		case "Common":
			return "#6e6e6e";
		case "Uncommon":
			return "#03593c";
		case "Rare":
			return "#162bc4";
		case "Epic":
			return "#7749a7";
		case "Legendary":
			return "#edc449";
		case "Mythic":
			return "#5d001f";
		case "BUNDLE":
			return "black"; 
		default: 
			return null;
	}
}

export const getMoMDropdownMenuItems = (filterName: string) => {
	return getMoMDropdownArraysByName(filterName)
		.map(v => <MenuItem value={v.value}>{v.name}</MenuItem>);
} 

export const getMoMDropdownArraysByName = (filterName: string): IDropDownValueArray[] => {
	switch(filterName){
		case "momFilterType":
			return [
				{ name: "None", value: MoMFilterTypeEnum.None },
				{ name: "Buildings", value: MoMFilterTypeEnum.Building },
				{ name: "Rarity", value: MoMFilterTypeEnum.Rarity },
			];
		case "momBuildingType":
			return [
				{ name: "None", value: 1 },
				{ name: "Buildings", value: 2 },
				{ name: "Rarity", value: 3 },
			];
		case "momLandAndBuildingRarity":
			return [
				{ name: "Common", value: MoMRarityEnum.Common },
				{ name: "Uncommon", value: MoMRarityEnum.Uncommon },
				{ name: "Rare", value: MoMRarityEnum.Rare },
				{ name: "Epic", value: MoMRarityEnum.Epic },
				{ name: "Legendary", value: MoMRarityEnum.Legendary },
				{ name: "Mythic", value: MoMRarityEnum.Mythic },
				{ name: "Special", value: MoMRarityEnum.Special },
			];
		default: 
			return [];
	}
}

export const getRarityNumberFromEnum = (rarity: string | null): number => {
	switch(rarity){
		case "Common":
			return MoMRarityEnum.Common;
		case "Uncommon":
			return MoMRarityEnum.Uncommon;
		case "Rare":
			return MoMRarityEnum.Rare;
		case "Epic":
			return MoMRarityEnum.Epic;
		case "Legendary":
			return MoMRarityEnum.Legendary;
		case "Mythic":
			return MoMRarityEnum.Mythic;
		case "Special":
			return MoMRarityEnum.Special;
		default: 
			return -1;
	}
}

export const sortLandPlotsByPrice = (lands: ILandPlot[] | null): ILandPlot[] => {
	if(!lands) return [];

	return lands.sort((a,b) => a.price.amount - b.price.amount);
}

export const getAllUniqBuildingsFromLandPlotData = (data: ILandPlot[]): string[] => {
	let values: string[] = [];
	
	for(let plot of data){
		for(let building of plot.buildingsData){
			if(!values.includes(building.building)) values.push(building.building);
		}
	}

	return values;
}

export const landPlotContainsAnyBuilding = (buildingOptions: IMoMAutocompleteOption[], landPlot: ILandPlot) => {
	return buildingOptions.find(b => landPlotContainsBuilding(b.label, landPlot)) ? true : false;
}

export const landPlotContainsBuilding = (buildingName: string, landPlot: ILandPlot): boolean => {
	return landPlot?.buildingsData?.find(b => b.building === buildingName) ? true : false;
}