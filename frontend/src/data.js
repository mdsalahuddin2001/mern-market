// product image size ==>> 218x192
// avatar image size ==>> 50x50
// color image size ==> 50x50

const data = {
  products: [
    {
      id: 1,
      name: 'Nike Slim Shirt',
      slug: 'nike-slim-shirt',
      category: 'shirts',
      images: [
        'images/products/product-1.jpg',
        'images/products/product-2.jpg',
        'images/products/product-3.jpg',
        'images/products/product-4.jpg',
      ],
      isSize: true,
      sizes: ['s', 'm', 'l', 'xl'],
      isColor: true,
      colors: [
        '/images/colors/c1.jpg',
        '/images/colors/c2.jpg',
        '/images/colors/c3.jpg',
      ],
      price: 1200,
      isDiscount: false,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'High quality shirt',
      isFeatured: true,
      isNew: true,
      reviews: [
        {
          id: 1,
          user: {
            name: 'John Doe',
            avatar: 'images/users/u1.jpg',
            rating: 4.8,
          },
          comment: 'Great product',
        },
        {
          id: 2,
          user: {
            name: 'Abdur Rahman',
            avatar: 'images/users/u2.jpg',
            rating: 4.5,
          },
          comment: 'Not bad',
        },
        {
          id: 3,
          user: {
            name: 'Abdullah',
            avatar: 'images/users/u3.jpg',
            rating: 4.8,
          },
          comment: 'Nice product',
        },
        {
          id: 4,
          user: {
            name: 'John Doe',
            avatar: 'images/users/u4.jpg',
            rating: 4.8,
          },
          comment: 'Beautiful',
        },
      ],
    },
    {
      id: 2,
      name: 'Petite Table Lamp',
      slug: 'petite-table-lamp',
      category: 'electronics',
      images: [
        'images/products/product-5.jpg',
        'images/products/product-6.jpg',
        'images/products/product-7.jpg',
        'images/products/product-8.jpg',
      ],
      isSize: true,
      sizes: ['s', 'm', 'l', 'xl'],
      isColor: true,
      colors: [
        '/images/colors/c1.jpg',
        '/images/colors/c2.jpg',
        '/images/colors/c3.jpg',
      ],
      price: 1200,
      isDiscount: true,
      discountedPrice: 1000,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'High quality shirt',
      isFeatured: true,
      isNew: true,
      reviews: [
        {
          id: 1,
          user: {
            name: 'John Doe',
            avatar: 'images/users/u1.jpg',
            rating: 4.8,
          },
          comment: 'Great product',
        },
        {
          id: 2,
          user: {
            name: 'Abdur Rahman',
            avatar: 'images/users/u2.jpg',
            rating: 4.5,
          },
          comment: 'Not bad',
        },
        {
          id: 3,
          user: {
            name: 'Abdullah',
            avatar: 'images/users/u3.jpg',
            rating: 4.8,
          },
          comment: 'Nice product',
        },
        {
          id: 4,
          user: {
            name: 'John Doe',
            avatar: 'images/users/u4.jpg',
            rating: 4.8,
          },
          comment: 'Beautiful',
        },
      ],
    },
    {
      id: 3,
      name: 'Nike Air Max Motion LW Racer',
      slug: 'nike-air-max-motion-lw-racer',
      category: 'shoes',
      images: [
        'images/products/product-9.jpg',
        'images/products/product-10.jpg',
        'images/products/product-11.jpg',
        'images/products/product-12.jpg',
      ],
      isSize: true,
      sizes: ['s', 'm', 'l', 'xl'],
      isColor: true,
      colors: [
        '/images/colors/c1.jpg',
        '/images/colors/c2.jpg',
        '/images/colors/c3.jpg',
      ],
      price: 1200,
      isDiscount: false,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'High quality shirt',
      isFeatured: true,
      isNew: true,
      reviews: [
        {
          id: 1,
          user: {
            name: 'John Doe',
            avatar: 'images/users/u1.jpg',
            rating: 4.8,
          },
          comment: 'Great product',
        },
        {
          id: 2,
          user: {
            name: 'Abdur Rahman',
            avatar: 'images/users/u2.jpg',
            rating: 4.5,
          },
          comment: 'Not bad',
        },
        {
          id: 3,
          user: {
            name: 'Abdullah',
            avatar: 'images/users/u3.jpg',
            rating: 4.8,
          },
          comment: 'Nice product',
        },
        {
          id: 4,
          user: {
            name: 'John Doe',
            avatar: 'images/users/u4.jpg',
            rating: 4.8,
          },
          comment: 'Beautiful',
        },
      ],
    },
    {
      id: 4,
      name: 'The North Face Raedonda Boot Sneaker',
      slug: 'the-north-face-raedonda-bot-sneaker',
      category: 'shirts',
      images: [
        'images/products/product-13.jpg',
        'images/products/product-14.jpg',
        'images/products/product-15.jpg',
        'images/products/product-16.jpg',
      ],
      isSize: true,
      sizes: ['s', 'm', 'l', 'xl'],
      isColor: true,
      colors: [
        '/images/colors/c1.jpg',
        '/images/colors/c2.jpg',
        '/images/colors/c3.jpg',
      ],
      price: 1200,
      isDiscount: true,
      discountedPrice: 1000,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'High quality shirt',
      isFeatured: true,
      isNew: true,
      reviews: [
        {
          id: 1,
          user: {
            name: 'John Doe',
            avatar: 'images/users/u1.jpg',
            rating: 4.8,
          },
          comment: 'Great product',
        },
        {
          id: 2,
          user: {
            name: 'Abdur Rahman',
            avatar: 'images/users/u2.jpg',
            rating: 4.5,
          },
          comment: 'Not bad',
        },
        {
          id: 3,
          user: {
            name: 'Abdullah',
            avatar: 'images/users/u3.jpg',
            rating: 4.8,
          },
          comment: 'Nice product',
        },
        {
          id: 4,
          user: {
            name: 'John Doe',
            avatar: 'images/users/u4.jpg',
            rating: 4.8,
          },
          comment: 'Beautiful',
        },
      ],
    },
  ],
};

export default data;
