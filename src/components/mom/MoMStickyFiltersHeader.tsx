import { Button, Checkbox, FilledInput, FormHelperText, Grid, InputAdornment, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MoMLandRarityFilterEnum } from "../../common/enum";
import { getLandChipColorByRarity } from "../../common/helper";

export interface IMoMStickyFiltersHeaderProps {
	fetchLandPlotData: () => void;
	onLandRarityFilterChange: (rarities: number[]) => void;
	onLandPriceChange: (value: number, isMin: boolean) => void;
	allLandsCount: number | null;
	filteredLandsCount: number | null;
}

export const MoMStickyFiltersHeader = (props: IMoMStickyFiltersHeaderProps) => {
	const [selectedLandRarities, setSelectedLandRarities] = useState<number[]>([
		MoMLandRarityFilterEnum.Common,
		MoMLandRarityFilterEnum.Uncommon,
		MoMLandRarityFilterEnum.Rare,
		MoMLandRarityFilterEnum.Epic,
		MoMLandRarityFilterEnum.Legendary
	]);
	const [minPrice, setMinPrice] = useState<number>(0);
	const [maxPrice, setMaxPrice] = useState<number>(0);

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

	const handlePriceChange = (value: string, isMin: boolean) => {
		const tempV = Number(value);

		if(!isNaN(tempV) && isMin)
			setMinPrice(tempV);
		else if(!isNaN(tempV) && !isMin)
			setMaxPrice(tempV);
		else 
			return;

		props.onLandPriceChange(tempV, isMin);
	}

	const isLandRarityChecked = (value: number) => {
		return selectedLandRarities.findIndex(v => v === value) > -1;
	}

	useEffect(() => {
		props.onLandRarityFilterChange(selectedLandRarities);
	}, [props, selectedLandRarities])

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
				<Button	variant="outlined" onClick={props.fetchLandPlotData}>Load land plots data</Button>
			</Grid>

			<Grid container style={{paddingBottom: "0.5rem"}}>
				<Grid item xs={12} style={{borderTop: "2px solid white", borderBottom: "2px solid white"}}>
					<Grid container style={{ alignItems: "center" }}>
						<Grid item xs={1} >
							<Typography variant="h5">Lands</Typography>
						</Grid>

						<Grid item xs={1} style={{textAlign: "left" }}>
							<Typography variant="h6">rarities</Typography>
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

						<Grid item xs={4}>
							<Grid container>
								<Grid item xs={4}>
									<FilledInput
										endAdornment={<InputAdornment position="end">WAX</InputAdornment>}
										id="mom-filter-min-price-input"
										inputProps={{
											"aria-label": "min price"
										}}
										onChange={(e) => handlePriceChange(e.target.value, true)}
										size="small"
										style={{ backgroundColor: "#121212"}}
										value={minPrice === 0 ? "" : minPrice}
									/>
									<FormHelperText id="mom-filter-min-price-input-text">min price</FormHelperText>
								</Grid>
								<Grid item xs={4} style={{paddingLeft: "0.5rem"}}>
									<FilledInput
										endAdornment={<InputAdornment position="end">WAX</InputAdornment>}
										id="mom-filter-max-price-input"
										inputProps={{
											"aria-label": "max price"
										}}
										onChange={(e) => handlePriceChange(e.target.value, false)}
										size="small"
										style={{ backgroundColor: "#121212"}}
										value={maxPrice === 0 ? "" : maxPrice}
									/>
									<FormHelperText id="mom-filter-max-price-input-text">max price</FormHelperText>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={3}>
							{ props.allLandsCount && (`${props.filteredLandsCount ?? 0} of ${props.allLandsCount} lands shown.`) }
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