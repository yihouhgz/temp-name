'use strict';

var vue = require('vue');

var buttonProps = {
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
};

var Wave = vue.defineComponent(function (props, _a) {
  var slots = _a.slots;
  var waveRef = vue.ref(null);
  var animRef = vue.ref(null);
  function onClick(e) {
    if (props.disabled || !waveRef.value) return;
    // 移除上一次动画
    if (animRef.value) {
      animRef.value.remove();
      animRef.value = null;
    }
    var el = waveRef.value;
    var rect = el.getBoundingClientRect();
    var wave = document.createElement('span');
    wave.className = 'vue-wave-effect';
    wave.style.left = "".concat(e.clientX - rect.left, "px");
    wave.style.top = "".concat(e.clientY - rect.top, "px");
    animRef.value = wave;
    el.appendChild(wave);
    wave.addEventListener('animationend', function () {
      wave.remove();
      animRef.value = null;
    }, {
      once: true
    });
  }
  vue.onUnmounted(function () {
    if (animRef.value) animRef.value.remove();
  });
  return function () {
    var _a;
    return vue.createVNode("div", {
      "ref": waveRef,
      "class": "vue-wave-container",
      "onClick": onClick,
      "style": {
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block'
      }
    }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]);
  };
}, {
  name: 'wave',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  }
});

var Button = vue.defineComponent(function (props, ctx) {
  var number = vue.ref(0);
  var handleClick = function () {
    number.value++;
  };
  var defaultRender = function () {
    var _a, _b;
    return vue.createVNode("div", null, [(_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a), number.value]);
  };
  return function () {
    return vue.createVNode(Wave, {
      "disabled": false
    }, {
      default: () => [vue.createVNode("button", {
        "class": "temp-button",
        "onClick": handleClick
      }, [defaultRender()])]
    });
  };
}, {
  name: 'nl-button',
  props: buttonProps
});

var watermarkProps = {
  width: 120,
  height: 64,
  inherit: true,
  rotate: -22,
  zIndex: 9,
  image: '',
  content: '',
  font: function () {
    return {
      fontSize: 16,
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      fontStyle: 'normal',
      color: 'rgba(0, 0, 0, 0.15)',
      textAlign: 'center'
    };
  },
  gap: function () {
    return [100, 100];
  },
  offset: function () {
    return [100 / 2, 100 / 2];
  }
};

var Watermark = vue.defineComponent({
  name: 'watermark',
  props: watermarkProps,
  setup: function (props) {
    console.log(props);
    return function () {
      return vue.createVNode("div", null, [vue.createTextVNode("watermark")]);
    };
  }
});

var components = [Button, Watermark];
var install = function (app) {
  components.forEach(function (component) {
    console.log(app, component);
    app.component(component.name, component);
  });
};

exports.components = components;
exports.install = install;
