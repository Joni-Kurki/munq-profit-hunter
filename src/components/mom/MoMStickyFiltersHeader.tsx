import { Button, Checkbox, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { MoMFilterTypeEnum, MoMLandRarityFilterEnum } from "../../common/enum";
import { getLandChipColorByRarity, getMoMDropdownMenuItems } from "../../common/helper";
import { IMoMFilter, IMoMLandPlotFilter } from "../../interfaces/IMoMInteface";

export interface IMoMStickyFiltersHeaderProps {
	fetchLandPlotData: () => void;
	onLandRarityFilterChange: (rarities: number[]) => void;
}

export const MoMStickyFiltersHeader = (props: IMoMStickyFiltersHeaderProps) => {
	const [selectedLandRarities, setSelectedLandRarities] = useState<number[]>([
		MoMLandRarityFilterEnum.Common,
		MoMLandRarityFilterEnum.Uncommon,
		MoMLandRarityFilterEnum.Rare,
		MoMLandRarityFilterEnum.Epic,
		MoMLandRarityFilterEnum.Legendary
	]);

	const handleLandRarityFilterChange = (value: number, checked: boolean) => {
		let selectedValues = [...selectedLandRarities];
		
		let found = selectedValues.find(v => v === value);

		if(found){
			selectedValues = selectedValues.filter(v => value !== v);
		} else {
			selectedValues.push(value);
		}
		setSelectedLandRarities([...selectedValues].sort((a,b) => a - b));
	}

	const isLandRarityChecked = (value: number) => {
		return selectedLandRarities.findIndex(v => v === value) > -1;
	}

	useEffect(() => {
		props.onLandRarityFilterChange(selectedLandRarities);
	}, [selectedLandRarities])

	const landRaritiesCheckBoxes = [
		{ label: "Common", value: MoMLandRarityFilterEnum.Common, color: getLandChipColorByRarity("Common")  },
		{ label: "Uncommon", value: MoMLandRarityFilterEnum.Uncommon , color: getLandChipColorByRarity("Uncommon") },
		{ label: "Rare", value: MoMLandRarityFilterEnum.Rare, color: getLandChipColorByRarity("Rare")  },
		{ label: "Epic", value: MoMLandRarityFilterEnum.Epic, color: getLandChipColorByRarity("Epic")  },
		{ label: "Legendary", value: MoMLandRarityFilterEnum.Legendary, color: getLandChipColorByRarity("Legendary")  },
	];

	return (
		<Grid container style={{ borderBottom: "solid 1px white" }}>
			<Grid container >
				<Button	variant="outlined" onClick={props.fetchLandPlotData}>Load the data</Button>
			</Grid>

			<Grid container>
				<Grid item xs={12}>
					<Grid container style={{ alignItems: "center" }}>
						<Grid item xs={1}>
							Land rarities
						</Grid>
						<Grid item xs={3}>
							{ landRaritiesCheckBoxes.map(box => 
								<Checkbox
									checked={isLandRarityChecked(box.value)}
									key={`mom-land-rarity-checkbox-${box.value}`}
									onChange={(e) => handleLandRarityFilterChange(box.value, e.target.checked)}
									style={{ color: box.color ?? "" }}
									title={box.label}
								/>
							) }
						</Grid>
						<Grid item xs={1}>
							Price
						</Grid>
						<Grid item xs={4}>
							min 150, max 300
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Grid container style={{ borderTop: "1px dotted white", padding: "0.5rem" }}>
				<Grid item xs={2}>Sale and Seller</Grid>
				<Grid item xs={1}>Bundle?</Grid>
				<Grid item xs={2}>Price</Grid>
				<Grid item xs={1}>Avail. space</Grid>
				<Grid item xs={1}>Land Rarity</Grid>
				<Grid item xs={5}>Buildings</Grid>
			</Grid>
		</Grid>
	)
}