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
    Divider
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
    Divider
}

const componentsHandler = {
    install(Vue) {
        Object.keys(components).forEach(key => Vue.use(components[key]));
    },
};

export default componentsHandler;
