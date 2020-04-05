<template>
  <ValidationProvider :name="name" :rules="validationRules" v-slot="{ errors }">
    <select
      :class="[
        'form-select block w-full transition rounded-md shadow-sm duration-150 ease-in-out sm:text-sm sm:leading-5',
        errors[0] || errorMessage ? 'border-red-500' : ''
      ]"
      :value="value"
      @input="handleInput"
      @blur="handelBlur"
      @change="handleChange"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
    </select>
    <div class="mt-2 text-xs text-red-500">{{ errors[0] || errorMessage }}</div>
  </ValidationProvider>
</template>

<script>
export default {
  name: "FormSelect",
  props: {
    name: {
      type: String,
      default: ""
    },
    value: {},
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rules: {
      type: String,
      default: ""
    },
    errorMessage: {
      type: String,
      default: ""
    },
    optional: {
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
    handelBlur(e) {
      this.$emit("blur", e.target.value);
    },
    handleChange(e) {
      this.$emit("change", e.target.value);
    }
  }
};
</script>
