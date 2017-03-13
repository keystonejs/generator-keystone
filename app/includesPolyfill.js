// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', { // eslint-disable-line
		value: function (searchElement, fromIndex) {
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}
			var o = Object(this);
			var len = o.length >>> 0;
			if (len === 0) {
				return false;
			}
			var n = fromIndex | 0;
			var k = Math.max(n >= 0
				? n
				: len - Math.abs(n), 0);
			while (k < len) {
				if (o[k] === searchElement) {
					return true;
				}
				k++;
			}
			return false;
		},
	});
}
