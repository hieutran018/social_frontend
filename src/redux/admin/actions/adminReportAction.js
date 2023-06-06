import {
    ADMIN_FETCH_REPORT_STARTED,
    ADMIN_FETCH_REPORT_SUCCESSED,
    ADMIN_FETCH_REPORT_FAILURED
} from '../constants/adminReportConstant';
import axios from 'axios';

export const adminFetchReportStarted = () => ({
    type: ADMIN_FETCH_REPORT_STARTED
})

export const adminFetchReportSuccessed = reports => ({
    type: ADMIN_FETCH_REPORT_SUCCESSED,
    reports
})

export const adminFetchReportFailured = errors => ({
    type: ADMIN_FETCH_REPORT_FAILURED,
    errors
})

export const fetchReports = (cookies) => {
    return async dispatch => {
        dispatch(adminFetchReportStarted())
        try {
            const requestURL = "http://127.0.0.1:8000/api/v1/admin/fetch-list-report";
            axios({
                method: 'GET',
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log(response.data);
                dispatch(adminFetchReportSuccessed(response.data));
            }).catch((error) => {
                console.log(error);
                dispatch(adminFetchReportFailured(error.message));
            });
        } catch (error) {
            dispatch(adminFetchReportFailured(error))
        }
    }
}