
const allowedThemes = [ 'office', 'party', 'noAlcohol', 'kids' ];


module.exports = {
  buildTakeoutMethodValidation: ({ Id }) => ({
    description: (value) => {
      const minLength = 10,
        maxLength = 200;
      let rtn = {
        rule: `Must be a string between ${minLength} and ${maxLength} characters`,
        passed: true,
      };
      if (typeof value !== "string") {
        rtn.passed = false;
        rtn.reason = `Description is not of type string`;
      } else if (value.length < minLength) {
        rtn.passed = false;
        rtn.reason = `Description is shorter than ${minLength} characters`;
      } else if (value.length > maxLength) {
        rtn.passed = false;
        rtn.reason = `Description is longer than ${maxLength} characters`;
      }
      return rtn;
    },
    difficulty: (value) => {
      const minVal = 1,
        maxVal = 10;
      let rtn = {
        rule: `Must be an integer between ${minVal} and ${maxVal}`,
        passed: true,
      };
      if (typeof value !== "number" || !Number.isInteger(value)) {
        rtn.passed = false;
        rtn.reason = `Difficulty is not an integer`;
      } else if (value < minVal) {
        rtn.passed = false;
        rtn.reason = `Difficulty is less than ${minVal}`;
      } else if (value > maxVal) {
        rtn.passed = false;
        rtn.reason = `Difficulty is more than ${maxVal}`;
      }
      return rtn;
    },
    createdBy: (value) => {
      let rtn = {
        rule: `Must be a valid Id`,
        passed: true,
      };
      if (!Id.isValidId(value)) {
        rtn.passed = false;
        rtn.reason = `createdBy is not valid Id`;
      }
      return rtn;
    },
    _id: (value) => {
      let rtn = {
        rule: `Must be a valid Id`,
        passed: true,
      };
      if (!Id.isValidId(value)) {
        rtn.passed = false;
        rtn.reason = `_id is not valid Id`;
      }
      return rtn;
    },
    disabled: (value) => {
      let rtn = {
        rule: `Must be boolean`,
        passed: true,
      };
      if (typeof value !== "boolean") {
        rtn.passed = false;
        rtn.reason = `disabled is not of type boolean`;
      }
      return rtn;
    },
    createdOn: (value) => {
      let rtn = {
        rule: `Must be of type number (system time) and in the past`,
        passed: true,
      };
      if (typeof value !== "number") {
        rtn.passed = false;
        rtn.reason = `createdOn is not of type number`;
      } else if (value > Date.now()) {
        rtn.passed = false;
        rtn.reason = `createdOn is not in the past`;
      }
      return rtn;
    },
    modifiedOn: (value) => {
      let rtn = {
        rule: `Must be of type number (system time) and in the past`,
        passed: true,
      };
      if (typeof value !== "number") {
        rtn.passed = false;
        rtn.reason = `modifiedOn is not of type number`;
      } else if (value > Date.now()) {
        rtn.passed = false;
        rtn.reason = `modifiedOn is not in the past`;
      }
      return rtn;
    },
    themes: (value) => {
      let rtn = {
        rule: `Must be an array with no repeated entries. All entries must be one of ${JSON.stringify(
          allowedThemes
        )}`,
        passed: true,
      };
      if (typeof value !== "object" || !Array.isArray(value)) {
        rtn.passed = false;
        rtn.reason = `themes is not an array`;
      } else if (new Set(value).size !== value.length) {
        rtn.passed = false;
        rtn.reason = `themes contains repeated entries`;
      } else if (!value.every((theme) => allowedThemes.includes(theme))) {
        rtn.passed = false;
        rtn.reason = `themes contains an illegal value`;
      }
      return rtn;
    },
  }),
  buildTakeoutValidation: ({ Id }) => ({
    _id: (value) => {
      let rtn = {
        rule: `Must be a valid Id`,
        passed: true,
      };
      if (!Id.isValidId(value)) {
        rtn.passed = false;
        rtn.reason = `_id is not valid Id`;
      }
      return rtn;
    },
    chaserId: (value) => {
      let rtn = {
        rule: `Must be a valid Id`,
        passed: true,
      };
      if (!Id.isValidId(value)) {
        rtn.passed = false;
        rtn.reason = `chaserId is not valid Id`;
      }
      return rtn;
    },
    targetId: (value) => {
      let rtn = {
        rule: `Must be a valid Id`,
        passed: true,
      };
      if (!Id.isValidId(value)) {
        rtn.passed = false;
        rtn.reason = `targetId is not valid Id`;
      }
      return rtn;
    },
    gameId: (value) => {
      let rtn = {
        rule: `Must be a valid Id`,
        passed: true,
      };
      if (!Id.isValidId(value)) {
        rtn.passed = false;
        rtn.reason = `gameId is not valid Id`;
      }
      return rtn;
    },
    takeoutMethodId: (value) => {
      let rtn = {
        rule: `Must be a valid Id`,
        passed: true,
      };
      if (!Id.isValidId(value)) {
        rtn.passed = false;
        rtn.reason = `takeoutMethodId is not valid Id`;
      }
      return rtn;
    },
    status: (value) => {
      const allowedStatuses = ["awaiting", "inProgress", "success", "fail"];
      let rtn = {
        rule: `Must be one of ${JSON.stringify(allowedStatuses)}`,
        passed: true,
      };
      if (!allowedStatuses.includes(value)) {
        rtn.passed = false;
        rtn.reason = `status is not an allowed status`;
      }
      return rtn;
    },
    createdOn: (value) => {
      let rtn = {
        rule: `Must be of type number (system time) and in the past`,
        passed: true,
      };
      if (typeof value !== "number") {
        rtn.passed = false;
        rtn.reason = `createdOn is not of type number`;
      } else if (value > Date.now()) {
        rtn.passed = false;
        rtn.reason = `createdOn is not in the past`;
      }
      return rtn;
    },
  }),
  buildGameValidation: ({ Id }) => ({
    description: (value) => {
      const minLength = 0,
        maxLength = 200;
      let rtn = {
        rule: `Must be a string between ${minLength} and ${maxLength} characters`,
        passed: true,
      };
      if (typeof value !== "string") {
        rtn.passed = false;
        rtn.reason = `Description is not of type string`;
      } else if (value.length < minLength) {
        rtn.passed = false;
        rtn.reason = `Description is shorter than ${minLength} characters`;
      } else if (value.length > maxLength) {
        rtn.passed = false;
        rtn.reason = `Description is longer than ${maxLength} characters`;
      }
      return rtn;
    },
    location: (value) => {
      const minLength = 2,
        maxLength = 60;
      let rtn = {
        rule: `Must be a string between ${minLength} and ${maxLength} characters`,
        passed: true,
      };
      if (typeof value !== "string") {
        rtn.passed = false;
        rtn.reason = `location is not of type string`;
      } else if (value.length < minLength) {
        rtn.passed = false;
        rtn.reason = `location is shorter than ${minLength} characters`;
      } else if (value.length > maxLength) {
        rtn.passed = false;
        rtn.reason = `location is longer than ${maxLength} characters`;
      }
      return rtn;
    },
    difficulty: (value) => {
      const minVal = 1,
        maxVal = 10;
      let rtn = {
        rule: `Must be an integer between ${minVal} and ${maxVal}`,
        passed: true,
      };
      if (typeof value !== "number" || !Number.isInteger(value)) {
        rtn.passed = false;
        rtn.reason = `Difficulty is not an integer`;
      } else if (value < minVal) {
        rtn.passed = false;
        rtn.reason = `Difficulty is less than ${minVal}`;
      } else if (value > maxVal) {
        rtn.passed = false;
        rtn.reason = `Difficulty is more than ${maxVal}`;
      }
      return rtn;
    },
    createdBy: (value) => {
      let rtn = {
        rule: `Must be a valid Id`,
        passed: true,
      };
      if (!Id.isValidId(value)) {
        rtn.passed = false;
        rtn.reason = `createdBy is not valid Id`;
      }
      return rtn;
    },
    _id: (value) => {
      let rtn = {
        rule: `Must be a valid Id`,
        passed: true,
      };
      if (!Id.isValidId(value)) {
        rtn.passed = false;
        rtn.reason = `_id is not valid Id`;
      }
      return rtn;
    },
    createdOn: (value) => {
      let rtn = {
        rule: `Must be of type number (system time) and in the past`,
        passed: true,
      };
      if (typeof value !== "number") {
        rtn.passed = false;
        rtn.reason = `createdOn is not of type number`;
      } else if (value > Date.now()) {
        rtn.passed = false;
        rtn.reason = `createdOn is not in the past`;
      }
      return rtn;
    },
    modifiedOn: (value) => {
      let rtn = {
        rule: `Must be of type number (system time) and in the past`,
        passed: true,
      };
      if (typeof value !== "number") {
        rtn.passed = false;
        rtn.reason = `modifiedOn is not of type number`;
      } else if (value > Date.now()) {
        rtn.passed = false;
        rtn.reason = `modifiedOn is not in the past`;
      }
      return rtn;
    },
    theme: (value) => {
      let rtn = {
        rule: `Must be one of ${JSON.stringify(allowedThemes)}`,
        passed: true,
      };
      if (!allowedThemes.includes(value)) {
        rtn.passed = false;
        rtn.reason = `given theme is not an allowed theme`;
      }
      return rtn;
    },
    players: (value) => {
        let rtn = {
          rule: `Must be an array with no repeated entries. All entries must be a valid Id`,
          passed: true,
        };
        if (typeof value !== "object" || !Array.isArray(value)) {
          rtn.passed = false;
          rtn.reason = `players is not an array`;
        } else if (new Set(value).size !== value.length) {
          rtn.passed = false;
          rtn.reason = `players contains repeated entries`;
        } else if (!value.every((_id) => Id.isValidId(_id))) {
          rtn.passed = false;
          rtn.reason = `players contains an entry which isnt a valid Id`;
        }
        return rtn;
      },
    invited: (value) => {
        let rtn = {
          rule: `Must be an array with no repeated entries. All entries must be a valid Id`,
          passed: true,
        };
        if (typeof value !== "object" || !Array.isArray(value)) {
          rtn.passed = false;
          rtn.reason = `invited is not an array`;
        } else if (new Set(value).size !== value.length) {
          rtn.passed = false;
          rtn.reason = `invited contains repeated entries`;
        } else if (!value.every((_id) => Id.isValidId(_id))) {
          rtn.passed = false;
          rtn.reason = `invited contains an entry which isnt a valid Id`;
        }
        return rtn;
      },
    admins: (value) => {
        let rtn = {
          rule: `Must be an array with no repeated entries. All entries must be a valid Id`,
          passed: true,
        };
        if (typeof value !== "object" || !Array.isArray(value)) {
          rtn.passed = false;
          rtn.reason = `admins is not an array`;
        } else if (new Set(value).size !== value.length) {
          rtn.passed = false;
          rtn.reason = `admins contains repeated entries`;
        } else if (!value.every((_id) => Id.isValidId(_id))) {
          rtn.passed = false;
          rtn.reason = `admins contains an entry which isnt a valid Id`;
        }
        return rtn;
      },
      status: (value) => {
        const allowedStatuses = ["awaiting", "inProgress", "finished"];
        let rtn = {
          rule: `Must be one of ${JSON.stringify(allowedStatuses)}`,
          passed: true,
        };
        if (!allowedStatuses.includes(value)) {
          rtn.passed = false;
          rtn.reason = `given status is not an allowed status`;
        }
        return rtn;
      },
      startTime: (value) => {
        let rtn = {
          rule: `Must be of type number (system time)`,
          passed: true,
        };
        if (typeof value !== "number") {
          rtn.passed = false;
          rtn.reason = `startTime is not of type number`;
        }
        return rtn;
      },
      maxDuration: (value) => {
        const minValue = 0;
        let rtn = {
          rule: `If set, must be of type number (system time) and greater than ${minValue}`,
          passed: true,
        };
        if (value && typeof value !== "number") {
          rtn.passed = false;
          rtn.reason = `maxDuration is not of type number`;
        } else if (value && value < minValue) {
            rtn.passed = false;
            rtn.reason = `maxDuration is not greater than ${minValue}`;
        }
        return rtn;
      },
      finishTime: (value) => {
        let rtn = {
          rule: `If set, must be of type number (system time) and in the past`,
          passed: true,
        };
        if (value && typeof value !== "number") {
          rtn.passed = false;
          rtn.reason = `finishTime is not of type number`;
        } else if (value && value > Date.now()) {
            rtn.passed = false;
            rtn.reason = `finishTime is not in the past`;
        }
        return rtn;
      },
  }),
};
