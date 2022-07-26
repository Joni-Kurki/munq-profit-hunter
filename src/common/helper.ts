import { IBuildingRarityLevel } from './../interfaces/IMoMInteface';

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