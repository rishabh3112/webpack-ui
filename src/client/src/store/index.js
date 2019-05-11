import { configureStore } from 'redux-starter-kit';
import { reducer } from './features/webpack';

const store = configureStore({
    reducer: {
        'webpack': reducer,
    }
})

export default store;