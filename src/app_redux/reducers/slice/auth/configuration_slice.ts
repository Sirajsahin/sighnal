import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IRouteReducerSliceStateInit } from '../slice_interface'

export type ConfigurationStateKeys =
    | 'cityList'
    | 'staffCategoryList'
    | 'providerCategoryList'
    | 'clinicProviderList'
    | 'permissions'
    | 'serviceDetail'
    | 'l1ServiceList'
    | 'serviceList'
    | 'equipmentService'
    | 'equipmentList'
    | 'staffList'
    | 'staffRolesList'
    | 'staffDetail'
    | 'staffCitiesList'
    | 'clinicOperationalCapacityList'
    | 'clinicListTable'
    | 'clinicDetail'
    | 'clinicCopyImagesList'
    | 'clinics'
    | 'cities'
    | 'providers'

export interface IConfigurationListState {
    cities: null
}

export interface IConfigurationListInitialState extends IRouteReducerSliceStateInit {
    state: IConfigurationListState
}

const initialState: IConfigurationListInitialState = {
    state: {
        cities: null
    }
}

const configurationSlice = createSlice({
    name: 'configuration_slice',
    initialState: initialState,
    reducers: {
        setCities: (
            state,
            action: PayloadAction<{
                data: null
            }>
        ) => {
            state.state.cities = action.payload.data
        }
    }
})

export const { setCities } = configurationSlice.actions
export default configurationSlice.reducer
