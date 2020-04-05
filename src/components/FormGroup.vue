<template>
  <div :class="[removeDefaultClasses ? '' : 'max-w-400 w-full']">
    <form-label>
      <slot></slot>
    </form-label>
    <form-input
      :class="inputClass"
      :type="type"
      @input="handleInput"
      v-bind="$props"
      :name="label"
      @blur="handleBlur"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: {
    name: {
      type: String
    },
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: ""
    },
    rules: {
      type: String,
      default: ""
    },
    errorMessage: {
      type: String,
      default: ""
    },
    min: {},
    max: {},
    type: {
      type: String,
      default: "text"
    },
    removeDefaultClasses: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: String,
      default: ""
    },
    optional: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    label() {
      if (this.name) return this.name;
      return this.$slots.default[0].text;
    }
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
    handleBlur(value) {
      this.$emit("blur", value);
    },
    handleChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>
