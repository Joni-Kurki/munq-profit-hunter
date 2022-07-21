import { Grid } from "@mui/material"
import { ILandPlot } from "../../interfaces/IMoMInteface"
import { IMoMLandPlotRowBuildingProps, MoMLandPlotRowBuilding } from "./MoMLandPlotRowBuilding";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ATOMIC_HUB_BASE } from "../../common/constants";

export interface IMoMLandPlotRowProps {
	data: ILandPlot;
}

export const MoMLandPlotRow = (props: IMoMLandPlotRowProps) => {
	const moMLandPlotRowBuildingProps: IMoMLandPlotRowBuildingProps = {
		data: props.data.buildingsData
	}
	//<a href={createAtomicHubInventoryLink(ico.owner, "terraformers", "exp1.ico", ico.template_mint, ico.template_mint)} target="_blank" rel="noreferrer noopener"><OpenInNewIcon fontSize="small" style={{ color: "#32b8f1"}} /> </a>
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
				{ props.data.rarity ?? "" }
			</Grid>
			<Grid item xs={5}>
				<MoMLandPlotRowBuilding {...moMLandPlotRowBuildingProps} />
			</Grid>
		</Grid>
	)
}