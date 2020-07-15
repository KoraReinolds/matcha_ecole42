export default {
  computed: {
    formValid: function() {
      return Object.values(this.rules).every((rule) => rule.valid === true);
    },
  },
  methods: {
    validate(data) {
      let { value, rules } = data;
      if (data.rules) {
        let msg = null;
        data.rules.every((rule) => {
          msg = rule(value);
          if (msg !== true) {
            data.errorMsg = msg;
            data.valid = false;
            return false;
          }
          return true;
        });
        if (msg === true) {
          data.errorMsg = null;
          data.valid = true;
        }
      }
    },
  },
};
