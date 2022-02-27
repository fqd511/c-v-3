import Catalog from './index.vue';
import type { DefineComponent } from 'vue';

Catalog.install = function (Vue: DefineComponent) {
	Vue.component(Catalog.name, Catalog)
}

export default Catalog;