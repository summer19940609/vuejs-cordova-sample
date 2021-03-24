import {
    Toast,
    Dialog,
    Cell,
    Col,
    Row,
    Form,
    Loading,
    PullRefresh,
    Empty,
    Lazyload,
    List,
    Skeleton,
    Field,
    Button,
} from 'vant';

const components = {
    Toast,
    Dialog,
    Cell,
    Col,
    Row,
    Form,
    Loading,
    PullRefresh,
    Empty,
    Lazyload,
    List,
    Skeleton,
    Field,
    Button,
};

const componentsHandler = {
    install(Vue) {
        Object.keys(components).forEach(key => Vue.use(components[key]));
    },
};

export default componentsHandler;
