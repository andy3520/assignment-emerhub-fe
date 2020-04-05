<template>
  <ValidationProvider tag="div" :name="name" :rules="validationRules" v-slot="{ errors }">
    <input
      :type="type"
      :class="[
        'form-input block w-full transition rounded-md shadow-sm duration-150 ease-in-out sm:text-sm sm:leading-5',
        errors[0] || errorMessage ? 'border-red-500' : '',
        disabled ? 'opacity-50' : ''
      ]"
      :disabled="disabled"
      :value="value"
      @input="handleInput"
      @blur="handleBlur"
      @change="handleChange"
      :min="min"
      :max="max"
      :placeholder="placeholder"
    />
    <div class="mt-1 text-sm text-red-500">{{ errors[0] || errorMessage }}</div>
  </ValidationProvider>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    name: {
      type: String,
      default: ""
    },
    value: {},
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
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
    optional: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    validationRules() {
      let rules = "";
      if (!this.optional) {
        rules = "required|";
      }
      if (this.rules) rules = rules + this.rules;
      return rules;
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    handleBlur(e) {
      this.$emit("blur", e.target.value);
    },
    handleChange(e) {
      this.$emit("change", e.target.value);
    }
  }
};
</script>
