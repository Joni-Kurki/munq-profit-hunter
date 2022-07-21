import { Grid } from "@mui/material";
import { IBuildingData } from "../../interfaces/IMoMInteface";


export interface IMoMLandPlotRowBuildingProps {
	data: IBuildingData[];
}

export const MoMLandPlotRowBuilding = (props: IMoMLandPlotRowBuildingProps) => {


	return (
		<Grid container>
			{ props.data.map(b => 
				<Grid container>
					<Grid item xs={9}>{`${b.quantity}x ${b.building} ${b.edition} Edition`}</Grid>
					<Grid item xs={3}>{`${b.rarityLevel.rarity}${b.rarityLevel.level}`}</Grid>
				</Grid>
			)}
		</Grid>
	)
}