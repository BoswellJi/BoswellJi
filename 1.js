/* Analyzed bindings: {
  "ref": "setup-const",
  "msg": "setup-ref"
} */
import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  vModelText as _vModelText,
  withDirectives as _withDirectives,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue';

import { ref } from 'vue';

const __sfc__ = {
  setup(__props) {
    const msg = ref('Hello World!');

    return (_ctx, _cache) => {
      return (
        _openBlock(),
        _createElementBlock(
          _Fragment,
          null,
          [
            _createElementVNode('h1', null, _toDisplayString(msg.value), 1 /* TEXT */),
            _withDirectives(
              _createElementVNode(
                'input',
                {
                  'onUpdate:modelValue': _cache[0] || (_cache[0] = ($event) => (msg.value = $event)),
                },
                null,
                512 /* NEED_PATCH */
              ),
              [[_vModelText, msg.value]]
            ),
          ],
          64 /* STABLE_FRAGMENT */
        )
      );
    };
  },
};
__sfc__.__file = 'App.vue';
export default __sfc__;
