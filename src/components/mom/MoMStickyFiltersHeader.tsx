import { Autocomplete, Button, Checkbox, CircularProgress, FilledInput, FormHelperText, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MoMLandRarityFilterEnum } from "../../common/enum";
import { getLandChipColorByRarity } from "../../common/helper";
import { IMoMAutocompleteOption } from "../../interfaces/IMoMInteface";

export interface IMoMStickyFiltersHeaderProps {
	allLandsCount: number | null;
	buildingSelectOptions: IMoMAutocompleteOption[];
	fetchLandPlotData: () => void;
	filteredLandsCount: number | null;
	isLoading: boolean;
	onBuildingChange: (buildings: IMoMAutocompleteOption[]) => void;
	onLandRarityFilterChange: (rarities: number[]) => void;
	onLandPriceChange: (value: number, isMin: boolean) => void;
	onWalletFilterChange: (value:string) => void;
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
	const [walletFilter, setWalletFilter] = useState<string>("");
	const [selectedBuildings, setSelectedBuildings] = useState<IMoMAutocompleteOption[]>(props.buildingSelectOptions);

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

	const handleWalletFilterChange = (value: string) => {
		setWalletFilter(value)

		props.onWalletFilterChange(value);
	}

	const handleBuildingSelection = (values: IMoMAutocompleteOption[]) => {
		setSelectedBuildings(values);
	}

	const isLandRarityChecked = (value: number) => {
		return selectedLandRarities.findIndex(v => v === value) > -1;
	}

	useEffect(() => {
		props.onLandRarityFilterChange(selectedLandRarities);
	}, [props, selectedLandRarities])

	useEffect(() => {
		props.onBuildingChange(selectedBuildings);
	}, [props, selectedBuildings])

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
				<Button	
					disabled={props.isLoading}
					onClick={props.fetchLandPlotData}
					variant="outlined" 
				>
					Load land plots data { props.isLoading ? <CircularProgress /> : ""}
				</Button>
			</Grid>

			<Grid container style={{paddingBottom: "0.5rem"}}>
				<Grid item xs={12} style={{borderTop: "2px solid white"}}>
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

				<Grid item xs={12} style={{borderBottom: "2px solid white", paddingBottom: "0.5rem"}}>
					<Grid container style={{ alignItems: "center" }}>
						<Grid item xs={1}></Grid>
						<Grid item xs={1} style={{textAlign: "left" }}>
							<Typography variant="h6">wallet</Typography>
						</Grid>
						<Grid item xs={2} style={{textAlign: "left" }}>
							<FilledInput
								id="mom-filter-wallet-input"
								inputProps={{
									"aria-label": "wallet name"
								}}
								onChange={(e) => handleWalletFilterChange(e.target.value)}
								size="small"
								style={{ backgroundColor: "#121212"}}
								value={walletFilter}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Grid container style={{paddingBottom: "0.5rem"}}>
				<Grid item xs={12}>
					<Grid container style={{ alignItems: "center" }}>
						<Grid item xs={2} >
							<Typography variant="h5">Buildings</Typography>
						</Grid>

						<Grid item xs={10}>
							<Autocomplete
								multiple
								onChange={(element, values) => handleBuildingSelection(values)}
								options={props.buildingSelectOptions}
								renderInput={(params) => 
									<TextField 
										{...params} 
										label="the plot has any of selected buildings" 
									/>
								}
								sx={{width: "100%"}}
							/>
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
				<Grid item xs={1}>Quad</Grid>
				<Grid item xs={4}>Buildings</Grid>
			</Grid>
		</Grid>
	)
}