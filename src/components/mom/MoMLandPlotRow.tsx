import { Chip, Grid } from "@mui/material"
import { ILandPlot } from "../../interfaces/IMoMInteface"
import { IMoMLandPlotRowBuildingProps, MoMLandPlotRowBuilding } from "./MoMLandPlotRowBuilding";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ATOMIC_HUB_BASE } from "../../common/constants";
import { getLandChipColorByRarity } from "../../common/helper";

export interface IMoMLandPlotRowProps {
	data: ILandPlot;
}

export const MoMLandPlotRow = (props: IMoMLandPlotRowProps) => {
	const moMLandPlotRowBuildingProps: IMoMLandPlotRowBuildingProps = {
		data: props.data.buildingsData
	}

	return (
		<Grid container style={{ borderBottom: "dotted 1px lightgrey" }}>
			<Grid item xs={2}>
				<Grid container>
					<Grid item xs={2}>
						<a href={`${ATOMIC_HUB_BASE}/market/sale/${props.data.saleId}`} target="_blank" rel="noreferrer noopener">
							<OpenInNewIcon/>
						</a>
					</Grid>
					<Grid item xs={10}>{ props.data.seller }</Grid>
				</Grid>
			</Grid>
			<Grid item xs={1}>
				{ props.data.isBundle ? "BUNDLE" : "" }
			</Grid>
			<Grid item xs={2}>
				{ `${props.data.price?.amount} ${props.data.price?.symbol}` }
			</Grid>
			<Grid item xs={1}>
				{ props.data.availableSpace }
			</Grid>
			<Grid item xs={1}>
				<Chip size="small" variant="outlined" label={props.data.rarity ?? "BUNDLE"} style={{backgroundColor: getLandChipColorByRarity(props.data.rarity ?? "BUNDLE") ?? ""}} />
			</Grid>
			<Grid item xs={1}>
				{ props.data.quad ?? "" }
			</Grid>
			<Grid item xs={4}>
				<MoMLandPlotRowBuilding {...moMLandPlotRowBuildingProps} />
			</Grid>
		</Grid>
	)
}