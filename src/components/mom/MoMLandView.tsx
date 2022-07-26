import { Grid, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react";
import { API_ENDPOINT_URL } from "../../common/constants"
import { MoMFilterTypeEnum } from "../../common/enum";
import { getRarityNumberFromEnum } from "../../common/helper";
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

	const handleFilterChange = (filters: IMoMFilter[]) => {

		for(let filter of filters){
			if(allLandPlotData && filter?.type && filter?.value
				&& Number(filter.type) === MoMFilterTypeEnum.Rarity){
				let filtered = [...allLandPlotData]
					.filter(a => getRarityNumberFromEnum(a.rarity ?? "") === Number(filter.value))
				setFilteredLandPlotData(filtered);
			}
		}
	}

	const moMStickyFiltersHeaderProps: IMoMStickyFiltersHeaderProps = {
		fetchLandPlotData: fetchLandPlotData,
		onFilterChange: (filters: IMoMFilter[]) => { handleFilterChange(filters) }
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