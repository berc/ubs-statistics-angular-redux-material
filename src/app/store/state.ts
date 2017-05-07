/**
 * Created by rastislavbertusek
 */

// create factory to be called once angular has been bootstrapped
import { AppStore, createAppStoreFactoryWithOptions } from 'angular2-redux';
import { Reducer } from './state-reducer';

const appStoreFactory = createAppStoreFactoryWithOptions({
    reducers: Reducer,
    debug: true
});

export let appStoreProvider = {
    provide: AppStore,
    useFactory: appStoreFactory
};
