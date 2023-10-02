module.exports = {
  buildGetPack({
    filterPacks,
    filterGames,
    filterTakeoutMethods,
    filterPackPurchases,
    throwError,
  }) {
    return async function (httpRequest) {
      const { ...filters } = httpRequest.query;
      const { _id } = httpRequest.params;

      let filterObj = {};

      if (_id) {
        filterObj = { ...filters, _id };
      } else filterObj = filters;

      const foundPacks = await filterPacks(filterObj);

      let body = await Promise.all(
        foundPacks.map(async (pack) => ({
          _id: pack._id,
          title: pack.title,
          description: pack.description,
          icon: pack.icon,
          example: pack.example,
          cost: pack.cost,
          disabled: pack.disabled,
          difficulty: pack.difficulty,
          numberTakeoutMethods: (
            await filterTakeoutMethods({ packId: pack._id, disabled: false })
          ).length,
          numberPurchases: (
            await filterPackPurchases({ packId: pack._id })
          ).length,
          numberPlays: (await filterGames({ packId: pack._id })).length,
        }))
      );

      if (_id) {
        if (body.length < 1) {
          throwError({
            status: 404,
            title: "pack not found with specified id",
            error: "pack-not-found",
          });
        }
        body = body[0];
      }

      return {
        headers: { "Content-Type": "application/json" },
        status: 200,
        body,
      };
    };
  },
};
