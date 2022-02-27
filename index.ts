import Catalog from "./components/Catalog";

import type { DefineComponent } from 'vue'

const components = [
	Catalog
]

const install = function (Vue: DefineComponent) {
	components.forEach(component => {
		Vue.component(component.name, component)
	})
}


export { Catalog };
