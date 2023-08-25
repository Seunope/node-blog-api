export const handlePagination = (data: any, modelName: string) => {
	const array = [];
	if (data?.edges?.length > 0) {
		for (let i = 0; i < data.edges.length; i++) {
			const element = data.edges[i];
			array.push(element.node);
		}
		return {
			total: data.totalCount,
			[modelName]: array,
			pageInfo: {
				nextPageKey: data.pageInfo.endCursor,
				previousPageKey: data.pageInfo.startCursor,
				hasNextPage: data.pageInfo.hasNextPage,
				hasPreviousPage: data.pageInfo.hasPreviousPage
			}
		};
	}
	return [];
};

export const handlePaginationRequest = (query: any) => {
	return {
		limit: Number(query?.limit) || 10,
		after: query?.next || "",
		before: query?.previous || "",
		order: query?.order || {},
		where: query?.where || {}
	};
};
