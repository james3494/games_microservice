
module.exports = {
  makeRemoveHitMethod ({ hitMethodDb }) {
    return async function ({ _id } = {}) {
      if (!_id) {
        throw new Error('You must supply a hitMethod id.');
      }
      const userToDelete = await hitMethodDb.findById({ _id });

      if (!userToDelete) {
        return deleteNothing();
      }
      return hardDelete(userToDelete);
    };

    function deleteNothing () {
      return {
        error: true,
        message: 'User not found, nothing to delete.'
      };
    }


    async function hardDelete (user) {
      return hitMethodDb.remove(user);
    }
  }
} ;
