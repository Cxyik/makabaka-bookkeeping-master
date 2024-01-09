const toJSONString = (json) => {
	if (typeof json == 'string') {
		return json;
	} else {
		return JSON.stringify(json);
	}
}
const newObj = (key, ref) => {
	return {
		position(p) {
			ref[key + 'position'](p);
			return this;
		},
		style(s) {
			ref[key + 'style'](toJSONString(s));
			return this;
		},
		color(f, colors) {
			ref[key + 'color'](f, colors);
			return this;
		},
		fixedSize(size) {
			ref[key + 'fixedSize'](size);
			return this;
		},
		fixedColor(color) {
			ref[key + 'fixedColor'](toJSONString(color));
			return this;
		}
	}
}

export function toF2Chart(ref) {
	return {
		animate(enable) {
			ref.animate(toJSONString(enable));
			return this;
		},
		source(json) {
			ref.source(toJSONString(json));
			return this;
		},
		margin(left, top, right, bottom) {
			ref.margin(left, top, right, bottom);
			return this;
		},
		padding(left, top, right, bottom) {
			ref.padding(left, top, right, bottom);
			return this;
		},
		scale(feild, json) {
			ref.setScale(feild, toJSONString(json));
			return this;
		},
		axis(feild, json) {
			ref.setAxis(feild, toJSONString(json));
			return this;
		},
		coord(json) {
			ref.setCoord(toJSONString(json));
			return this;
		},
		interaction(type, json) {
			ref.interaction(type, toJSONString(json));
			return this;
		},
		line() {
			const key = "line2"
			return {
				...newObj(key, ref),
				size(field, sizes) {
					ref[key + 'size'](field, sizes);
					return this;
				}
			}
		},
		area() {
			const key = "area2"
			return {
				...newObj(key, ref)
			}
		},
		interval() {
			const key = "interval2"
			return {
				...newObj(key, ref),
				adjust(adjust) {
					ref[key + 'adjust'](adjust);
					return this;
				},
				tag(tag) {
					ref[key + 'tag'](tag);
					return this;
				}
			}
		},
		point() {
			const key = "point2"
			return {
				...newObj(key, ref)
			}
		},
		guide() {
			const key = "guide2"
			return {
				flag(json) {
					ref[key + 'flag'](toJSONString(json));
					return this;
				},
				text(json) {
					ref[key + 'text'](toJSONString(json));
					return this;
				},
				background(json) {
					ref[key + 'background'](toJSONString(json));
					return this;
				}
			}
		},
		render() {
			ref.render();
		}
	}
}