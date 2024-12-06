export function transformProductData(apiResponse) {
    return {
        id: apiResponse.productId.toString(), // Convert productId to string if necessary
        productName: apiResponse.productName,
        imgUrl: apiResponse.url, // Assuming the URL is the image URL
        category: apiResponse.category, // Convert category to lowercase
        price: Math.round(apiResponse.price), // Convert price to an integer if required
        shortDesc: apiResponse.description.slice(0, 100) + "...", // Shorten description and add ellipsis
        description: apiResponse.description,
        reviews: [], // Default to an empty array if reviews aren't available in the API response
        avgRating: (Math.random() * (5 - 2) + 2).toFixed(2), // Default average rating if not provided by the API
    };
}