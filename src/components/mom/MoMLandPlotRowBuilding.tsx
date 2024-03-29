import { Chip, Grid } from "@mui/material";
import { getBuildingChipColorByRarity } from "../../common/helper";
import { IBuildingData } from "../../interfaces/IMoMInteface";


export interface IMoMLandPlotRowBuildingProps {
	data: IBuildingData[];
	saleId: number;
}

export const MoMLandPlotRowBuilding = (props: IMoMLandPlotRowBuildingProps) => {


	return (
		<Grid container>
			{ props.data.map(b => 
				<Grid key={`mom-land-plot-row-buildings-building-${b.building}-${props.saleId}-${Math.random()}`} container>
					<Grid item xs={9}>{`${b.quantity}x ${b.building} ${b.edition}`}</Grid>
					<Grid item xs={3}>
						<Chip variant="outlined" size="small" style={{ backgroundColor: getBuildingChipColorByRarity(b.rarityLevel)}} label={`${b.rarityLevel.rarity}${b.rarityLevel.level}`} />
					</Grid>
				</Grid>
			)}
		</Grid>
	)
}