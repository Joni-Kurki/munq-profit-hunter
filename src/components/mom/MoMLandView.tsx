import { Grid, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react";
import { API_ENDPOINT_URL } from "../../common/constants"
import { MoMLandRarityFilterEnum } from "../../common/enum";
import { getRarityNumberFromEnum, sortLandPlotsByPrice } from "../../common/helper";
import { IGetLandPlotsResponse, ILandPlot } from "../../interfaces/IMoMInteface";
import { IMoMLandPlotRowProps, MoMLandPlotRow } from "./MoMLandPlotRow";
import { IMoMStickyFiltersHeaderProps, MoMStickyFiltersHeader } from "./MoMStickyFiltersHeader";

export const MoMLandView = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [allLandPlotData, setAllLandPlotData] = useState<ILandPlot[] | null>(null);
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
	}, [allLandPlotData])

	const filterChange = () => {
		if(!allLandPlotData) return;

		let allLandPlots:ILandPlot [] = [];

		// Filters for rarities
		for(let rarity of landsRarities){
			allLandPlots = allLandPlots.concat(allLandPlotData.filter(p => getRarityNumberFromEnum(p.rarity) === rarity))
		}	
		
		allLandPlots = allLandPlots.concat(allLandPlotData.filter(p => p.rarity === null));

		// Filter for wallet
		if(walletFilter !== ""){
			console.log(walletFilter.includes(allLandPlotData[0]?.seller))
			allLandPlots = allLandPlots.filter(a => a.seller.toLowerCase().indexOf(walletFilter.toLowerCase()) > -1);
		}

		// Filter for price
		allLandPlots = allLandPlots.filter(a => a.price.amount >= landsMinPrice && a.price.amount <= landsMaxPrice);

		console.log(allLandPlots);

		setFilteredLandPlotData(sortLandPlotsByPrice([...allLandPlots]));
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
		console.log(walletFilter);
		filterChange();
	}, [landsMinPrice, landsMaxPrice, landsRarities, walletFilter])

	const moMStickyFiltersHeaderProps: IMoMStickyFiltersHeaderProps = {
		fetchLandPlotData: fetchLandPlotData,
		onLandRarityFilterChange: (filters: number[]) => { onLandRarityFilterChange(filters) },
		onLandPriceChange: (value: number, isMin: boolean) => { onLandPriceChange(value, isMin) },
		onWalletFilterChange: (value: string) => { onWalletFilterChange(value) },
		allLandsCount: allLandPlotData?.length ?? null,
		filteredLandsCount: filteredLandPlotData?.length ?? null,
		isLoading: isLoading
	}

	return(
		<Grid container>
			<Grid container>
				<Grid container>
					<Typography variant="h4">MoM land plot scanner by munqqqcrypto</Typography>
				</Grid>
				
				<MoMStickyFiltersHeader {...moMStickyFiltersHeaderProps} />
			</Grid>
			<Grid container>

				{ (filteredLandPlotData && filteredLandPlotData?.length > 0) ? filteredLandPlotData?.map(plot => {
					const props: IMoMLandPlotRowProps = {
						data: plot
					}
					return (
						<MoMLandPlotRow {...props} />
					);
				})
				: <></>} 
			</Grid>
		</Grid>
	)
}