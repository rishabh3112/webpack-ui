import { createSlice } from 'redux-starter-kit';

// To handle webpack state
const webpack = createSlice({
    slice: "webpack",
    initialState: "",
    reducers: {
        update: (state, action) => action.payload,
    }
});

export const { actions, reducer } = webpack;

const { update } = actions;

export const refresh = () => async (dispatch) => {
    const webpack = await request('/api/init', {type: "refresh"});
    dispatch(update(webpack.webpack));
}

export const scaffold = () => async (dispatch) => {
    const webpack = await request('/api/init', {type: "defaults"});
    dispatch(update(webpack.webpack));
}

export const save = (newWebpack) => async (dispatch) => {
    const webpack = await request('/api/save', {webpack: newWebpack});
    dispatch(update(webpack.webpack));
}

async function request(route, req) {
    const data = await fetch(
        `http://localhost:1234${route}`,
        {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(res => res.json());
    return data;
}