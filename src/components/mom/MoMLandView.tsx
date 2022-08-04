import { Grid, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react";
import { API_ENDPOINT_URL } from "../../common/constants"
import { MoMLandRarityFilterEnum } from "../../common/enum";
import { getAllUniqBuildingsFromLandPlotData, getRarityNumberFromEnum, landPlotContainsAnyBuilding, sortLandPlotsByPrice } from "../../common/helper";
import { IGetLandPlotsResponse, ILandPlot, IMoMAutocompleteOption } from "../../interfaces/IMoMInteface";
import { IMoMLandPlotRowProps, MoMLandPlotRow } from "./MoMLandPlotRow";
import { IMoMStickyFiltersHeaderProps, MoMStickyFiltersHeader } from "./MoMStickyFiltersHeader";

export const MoMLandView = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [allLandPlotData, setAllLandPlotData] = useState<ILandPlot[] | null>(null);
	const [buildingsAutocomplete, setBuildingsAutocomplete] = useState<IMoMAutocompleteOption[]>([]);
	const [filteredLandPlotData, setFilteredLandPlotData] = useState<ILandPlot[] | null>(null);
	const [landsRarities, setLandsRarities] = useState<number[]>([
		MoMLandRarityFilterEnum.Common,
		MoMLandRarityFilterEnum.Uncommon,
		MoMLandRarityFilterEnum.Rare,
		MoMLandRarityFilterEnum.Epic,
		MoMLandRarityFilterEnum.Legendary
	]);
	const [landsMinPrice, setLandsMinPrice] = useState<number>(-Infinity);
	const [landsMaxPrice, setLandsMaxPrice] = useState<number>(Infinity);
	const [walletFilter, setWalletFilter] = useState<string>("");
	const [selectedBuildings, setSelectedBuildings] = useState<IMoMAutocompleteOption[]>([]);

	const fetchLandPlotData = () => {
		if(isLoading) return;

		setIsLoading(true);
		axios.get<IGetLandPlotsResponse>(`${API_ENDPOINT_URL}/api/mom/getLandPlots`)
			.then(response => {
				if(response?.data){
					setAllLandPlotData(response?.data.landPlots ?? null);
				}
			})
			.finally(() => setIsLoading(false));
	}

	useEffect(() => {
		setFilteredLandPlotData(allLandPlotData);

		if(allLandPlotData && allLandPlotData.length > 0){
			let buildingOptions: IMoMAutocompleteOption[] = getAllUniqBuildingsFromLandPlotData(allLandPlotData)
				.map((b, index) => {
					return {
						label: b,
						value: index
					} as IMoMAutocompleteOption
				}
			);

			setBuildingsAutocomplete(buildingOptions);
		}
	}, [allLandPlotData])

	useEffect(() => {
		filterChange();
	}, [selectedBuildings]);

	const filterChange = () => {
		if(!allLandPlotData) return;

		let filteredPlotsToUse:ILandPlot [] = [];

		// Filters for rarities
		for(let rarity of landsRarities){
			filteredPlotsToUse = filteredPlotsToUse.concat(allLandPlotData.filter(p => getRarityNumberFromEnum(p.rarity) === rarity))
		}	
		
		// Add bundles too
		filteredPlotsToUse = filteredPlotsToUse.concat(allLandPlotData.filter(p => p.rarity === null));

		// Filter for wallet
		if(walletFilter !== ""){
			console.log(walletFilter.includes(allLandPlotData[0]?.seller))
			filteredPlotsToUse = filteredPlotsToUse.filter(a => a.seller.toLowerCase().indexOf(walletFilter.toLowerCase()) > -1);
		}

		// Filter for price
		filteredPlotsToUse = filteredPlotsToUse.filter(a => a.price.amount >= landsMinPrice && a.price.amount <= landsMaxPrice);

		// Filter by buildings
		if(selectedBuildings.length > 0)
			filteredPlotsToUse = filteredPlotsToUse.filter(a => landPlotContainsAnyBuilding(selectedBuildings, a));

		console.log(filteredPlotsToUse);

		setFilteredLandPlotData(sortLandPlotsByPrice([...filteredPlotsToUse]));
	}

	const onLandRarityFilterChange = (filters: number[]) => {
		setLandsRarities(filters);
	}

	const onLandPriceChange = (value: number, isMin: boolean) => {
		if(isMin)
			setLandsMinPrice(value === 0 ? -Infinity : value);
		else 
			setLandsMaxPrice(value === 0 ? Infinity : value);
	}

	const onWalletFilterChange = (value: string) => {
		setWalletFilter(value);
	}

	useEffect(() => {
		filterChange();
	}, [landsMinPrice, landsMaxPrice, landsRarities, walletFilter])

	const momStickyFiltersHeaderProps: IMoMStickyFiltersHeaderProps = {
		allLandsCount: allLandPlotData?.length ?? null,
		buildingSelectOptions: buildingsAutocomplete,
		fetchLandPlotData: fetchLandPlotData,
		filteredLandsCount: filteredLandPlotData?.length ?? null,
		isLoading: isLoading,
		onBuildingChange: (buildings: IMoMAutocompleteOption[]) => { setSelectedBuildings(buildings) },
		onLandRarityFilterChange: (filters: number[]) => { onLandRarityFilterChange(filters) },
		onLandPriceChange: (value: number, isMin: boolean) => { onLandPriceChange(value, isMin) },
		onWalletFilterChange: (value: string) => { onWalletFilterChange(value) },
	}

	return(
		<Grid container>
			<Grid container>
				<Grid container>
					<Typography variant="h4">MoM land plot scanner by munqqqcrypto</Typography>
				</Grid>
				
				<MoMStickyFiltersHeader {...momStickyFiltersHeaderProps} />
			</Grid>
			<Grid container>

				{ (filteredLandPlotData && filteredLandPlotData?.length > 0) ? filteredLandPlotData
					?.map(plot => {
						const props: IMoMLandPlotRowProps = {
							data: plot
						}
						return (
							<MoMLandPlotRow key={`mom-land-plot-row-sale-${plot.saleId}`} {...props} />
						);
					})
					: <></>} 
			</Grid>
		</Grid>
	)
}