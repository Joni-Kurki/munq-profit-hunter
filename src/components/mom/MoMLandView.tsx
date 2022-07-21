import { Button, Grid, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react";
import { API_ENDPOINT_URL } from "../../common/constants"
import { IGetLandPlotsResponse, ILandPlot } from "../../interfaces/IMoMInteface";
import { IMoMLandPlotRowProps, MoMLandPlotRow } from "./MoMLandPlotRow";

export const MoMLandView = () => {

	const [landPlotData, setLandPlotData] = useState<ILandPlot[] | null>(null);

	const handleButtonClick = () => {
		axios.get<IGetLandPlotsResponse>(`${API_ENDPOINT_URL}/api/mom/getLandPlots`)
			.then(response => {
				if(response?.data){
					setLandPlotData(response?.data.landPlots ?? null);
				}
			});
	}

	useEffect(() => {
		console.log(landPlotData);
	}, [landPlotData])

	return(
		<Grid container>
			<Grid container>
				<Grid container>
					<Typography variant="h2">MoM land plot scanner</Typography>
				</Grid>
				<Grid container>
					<Button	variant="outlined" onClick={handleButtonClick}>Get 'em</Button>
				</Grid>
			</Grid>
			<Grid container>

				{ (landPlotData && landPlotData?.length > 0) ? landPlotData?.map(plot => {
					const props:IMoMLandPlotRowProps = {
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