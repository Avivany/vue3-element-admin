import type { App } from "vue";
import {setupRouter} from '@/router';
import {setupStore} from '@/store';

export default {
    install(app:App<Element>){
        //router
        setupRouter(app);
        //store
        setupStore(app);
    }
}