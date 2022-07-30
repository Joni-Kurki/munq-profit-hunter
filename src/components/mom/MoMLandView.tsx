import { Grid, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react";
import { API_ENDPOINT_URL } from "../../common/constants"
import { MoMFilterTypeEnum } from "../../common/enum";
import { getRarityNumberFromEnum, sortLandPlotsByPrice } from "../../common/helper";
import { IGetLandPlotsResponse, ILandPlot, IMoMFilter } from "../../interfaces/IMoMInteface";
import { IMoMLandPlotRowProps, MoMLandPlotRow } from "./MoMLandPlotRow";
import { IMoMStickyFiltersHeaderProps, MoMStickyFiltersHeader } from "./MoMStickyFiltersHeader";

export const MoMLandView = () => {

	const [allLandPlotData, setAllLandPlotData] = useState<ILandPlot[] | null>(null);
	const [filteredLandPlotData, setFilteredLandPlotData] = useState<ILandPlot[] | null>(null);

	const fetchLandPlotData = () => {
		axios.get<IGetLandPlotsResponse>(`${API_ENDPOINT_URL}/api/mom/getLandPlots`)
			.then(response => {
				if(response?.data){
					setAllLandPlotData(response?.data.landPlots ?? null);
				}
			});
	}

	useEffect(() => {
		setFilteredLandPlotData(allLandPlotData);
	}, [allLandPlotData])

	useEffect(() => {
		console.log(filteredLandPlotData)
	}, [filteredLandPlotData])

	const onLandRarityFilterChange = (filters: number[]) => {
		if(!allLandPlotData) return;

		let allLandPlots:ILandPlot [] = [];

		for(let rarity of filters){
			allLandPlots = allLandPlots.concat(allLandPlotData.filter(p => getRarityNumberFromEnum(p.rarity) === rarity))
		}	
		
		allLandPlots = allLandPlots.concat(allLandPlotData.filter(p => p.rarity === null));

		setFilteredLandPlotData(sortLandPlotsByPrice([...allLandPlots]));
	}

	const moMStickyFiltersHeaderProps: IMoMStickyFiltersHeaderProps = {
		fetchLandPlotData: fetchLandPlotData,
		onLandRarityFilterChange: (filters: number[]) => { onLandRarityFilterChange(filters) }
	}

	return(
		<Grid container>
			<Grid container>
				<Grid container>
					<Typography variant="h2">MoM land plot scanner</Typography>
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