import { Button, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { MoMFilterTypeEnum } from "../../common/enum";
import { getMoMDropdownMenuItems } from "../../common/helper";
import { IMoMFilter, IMoMLandPlotFilter } from "../../interfaces/IMoMInteface";

export interface IMoMStickyFiltersHeaderProps {
	fetchLandPlotData: () => void;
	onFilterChange: (filters: IMoMFilter[]) => void;
}

export const MoMStickyFiltersHeader = (props: IMoMStickyFiltersHeaderProps) => {
	const [selectedFilterType, setSelectedFilter] = useState<string | null>(null);
	const [selectedSecondaryFilterType, setSelectedSecondaryFilterType] = useState<number[]>([]);

	const handleFilterChange = (event: SelectChangeEvent<typeof selectedFilterType> | SelectChangeEvent<typeof selectedSecondaryFilterType>, filterLevel: number = 0) => {
		const value: string = event.target.value as string; 
		console.log(value);

		if(value && value !== ""){
			switch(filterLevel){
				case 0:
					setSelectedFilter(value);
					break;
				case 1:
					// let values = [...selectedSecondaryFilterType];
					const valueToUse: number[] = event.target.value as number[];
					// const contains = values.find(f => f === valueToUse);
					
					// console.log(values, contains, valueToUse)
					// if(contains)
					// 	values = values.filter(f => f !== valueToUse);
					// else 
					// 	values.push(valueToUse);

					setSelectedSecondaryFilterType(valueToUse);
					break;
				default:
					return;
			}
		} else {
			setSelectedFilter(null);
			setSelectedSecondaryFilterType([]);
		}
	}

	useEffect(() => {
		if(selectedFilterType && Number(selectedFilterType) === MoMFilterTypeEnum.None){
			setSelectedSecondaryFilterType([]);
		}
		// console.log(selectedFilterType, selectedSecondaryFilterType);

		const filter: IMoMFilter = {
			type: Number(selectedFilterType) || null,
			value: selectedSecondaryFilterType || null
		} 


		props.onFilterChange([filter]);
	}, [selectedFilterType, selectedSecondaryFilterType])

	return (
		<Grid container style={{ borderBottom: "solid 1px white" }}>
			<Grid container >
				<Button	variant="outlined" onClick={props.fetchLandPlotData}>Get 'em</Button>
			</Grid>

			<Grid container>
				<Grid item xs={2}>
					<InputLabel id={"mom-filter-type-select-label"}>Filtering type</InputLabel>
					<Select
						labelId="mom-filter-type-select-label"
						onChange={(event: SelectChangeEvent) => handleFilterChange(event)}
						value={selectedFilterType ?? ""}
					>
						{ getMoMDropdownMenuItems("momFilterType") }
					</Select>
				</Grid>

				{ (selectedFilterType && Number(selectedFilterType) !== MoMFilterTypeEnum.None) && 
					<Grid item xs={2}>
						<InputLabel id={"mom-filter-value-select-label"}>Filter</InputLabel>
						<Select
							labelId="mom-filter-value-select-label"
							onChange={(event: SelectChangeEvent<typeof selectedSecondaryFilterType>) => handleFilterChange(event, 1)}
							// onChange={() => {}}
							multiple
							value={selectedSecondaryFilterType}
						>
							{ getMoMDropdownMenuItems("momLandAndBuildingRarity") }
						</Select>
					</Grid>
				}
			</Grid>

			<Grid container style={{ borderTop: "1px dotted white", padding: "0.5rem" }}>
				<Grid item xs={2}>Sale and Seller</Grid>
				<Grid item xs={1}>Bundle?</Grid>
				<Grid item xs={2}>Price</Grid>
				<Grid item xs={1}>Avail. space</Grid>
				<Grid item xs={1}>Land Rarity</Grid>
				<Grid item xs={5}>Buildings</Grid>
			</Grid>
		</Grid>
	)
}