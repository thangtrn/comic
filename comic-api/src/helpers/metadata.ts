export default function returnMeta<T = any>(data: T[], page: number, limit: number, count: number) {
  return {
    data,
    pagination: {
      page: page,
      limit: limit,
      total: Math.ceil(count / limit),
      totalItemPage: data.length,
      totalItemCount: count,
    },
  };
}
