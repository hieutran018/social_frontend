import {
    ADMIN_DASHBOARD_FETCH_STARTED,
    ADMIN_DASHBOARD_FETCH_SUCCESSED,
    ADMIN_DASHBOARD_FETCH_FAILURED
} from '../constants/adminDashboardConstant';
import axios from 'axios';

export const adminDashboardFetchStarted = () => ({
    type: ADMIN_DASHBOARD_FETCH_STARTED
})

export const adminDashboardFetchSuccessed = dashboard => ({
    type: ADMIN_DASHBOARD_FETCH_SUCCESSED,
    dashboard
})

export const adminDashboardFetchFailured = errors => ({
    type: ADMIN_DASHBOARD_FETCH_FAILURED,
    errors
})

export const fetchDashboardData = (cookies) => {
    return async dispatch => {
        dispatch(adminDashboardFetchStarted())
        try {
            const requestURL = "https://ckcsocial.site/api/v1/admin/admin-dashboard-statistics";
            axios({
                method: 'GET',
                url: requestURL,

                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                dispatch(adminDashboardFetchSuccessed(response.data));
                console.log(response.data);
            }).catch((error) => dispatch(adminDashboardFetchFailured(error.message)));
        } catch (error) {
            dispatch(adminDashboardFetchFailured(error))
        }
    }
}

