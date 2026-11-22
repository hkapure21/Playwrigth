import { ProductInfo } from '../types/testData';

export const productsData = {
  sauceLabsBackpack: {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack',
  } satisfies ProductInfo,

  sauceLabsBikeLight: {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    description: "A red light isn't the desired state in testing but it is for a bike light.",
  } satisfies ProductInfo,
};
