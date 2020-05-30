import { S as SvelteComponentDev, i as init, d as dispatch_dev, o as globals, s as safe_not_equal, v as validate_slots, a as space, e as element, t as text, q as query_selector_all, b as detach_dev, c as claim_space, f as claim_element, g as children, h as claim_text, k as add_location, l as insert_dev, m as append_dev, p as set_data_dev, n as noop } from './client.cdf98c44.js';

/* src/routes/twitter/index.svelte generated by Svelte v3.23.0 */

const { console: console_1 } = globals;
const file = "src/routes/twitter/index.svelte";

function create_fragment(ctx) {
	let t0;
	let h1;
	let t1;
	let t2;
	let div;
	let t3;

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text("Recent posts");
			t2 = space();
			div = element("div");
			t3 = text(/*trends*/ ctx[0]);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-hfp9t8\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "Recent posts");
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			t3 = claim_text(div_nodes, /*trends*/ ctx[0]);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Blog";
			add_location(h1, file, 22, 0, 366);
			add_location(div, file, 24, 0, 389);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, div, anchor);
			append_dev(div, t3);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*trends*/ 1) set_data_dev(t3, /*trends*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function preload({ params, query }) {
	return this.fetch(`twitter/trending.json`).then(r => {
		return r.json();
	}).then(data => {
		return { trends: data[0].trends };
	});
}

function instance($$self, $$props, $$invalidate) {
	let { trends } = $$props;
	console.log(trends);
	const writable_props = ["trends"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Twitter> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Twitter", $$slots, []);

	$$self.$set = $$props => {
		if ("trends" in $$props) $$invalidate(0, trends = $$props.trends);
	};

	$$self.$capture_state = () => ({ preload, trends });

	$$self.$inject_state = $$props => {
		if ("trends" in $$props) $$invalidate(0, trends = $$props.trends);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [trends];
}

class Twitter extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { trends: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Twitter",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*trends*/ ctx[0] === undefined && !("trends" in props)) {
			console_1.warn("<Twitter> was created without expected prop 'trends'");
		}
	}

	get trends() {
		throw new Error("<Twitter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set trends(value) {
		throw new Error("<Twitter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Twitter;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZmRhMGU2OGMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvdHdpdHRlci9pbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG5cdGV4cG9ydCBmdW5jdGlvbiBwcmVsb2FkKHsgcGFyYW1zLCBxdWVyeSB9KSB7XG5cdFx0cmV0dXJuIHRoaXMuZmV0Y2goYHR3aXR0ZXIvdHJlbmRpbmcuanNvbmApLnRoZW4ociA9PiB7IFxuICAgICAgcmV0dXJuIHIuanNvbigpIFxuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG5cdFx0XHRyZXR1cm4geyB0cmVuZHM6IGRhdGFbMF0udHJlbmRzIH07XG5cdFx0fSk7XG5cdH1cbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICBleHBvcnQgbGV0IHRyZW5kcztcbiAgY29uc29sZS5sb2codHJlbmRzKTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5CbG9nPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxoMT5SZWNlbnQgcG9zdHM8L2gxPlxuXG48ZGl2PlxuICB7dHJlbmRzfVxuPC9kaXY+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBeUJHLEdBQU07Ozs7Ozs7Ozs7Ozs7O3lDQUFOLEdBQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5REFBTixHQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXhCUSxPQUFPLEdBQUcsTUFBTSxFQUFFLEtBQUs7UUFDL0IsSUFBSSxDQUFDLEtBQUssMEJBQTBCLElBQUksQ0FBQyxDQUFDO1NBQ3RDLENBQUMsQ0FBQyxJQUFJO0lBQ1osSUFBSSxDQUFDLElBQUk7V0FDSixNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxNQUFNOzs7OztPQU1yQixNQUFNO0NBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
