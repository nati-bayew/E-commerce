export const registrationForm = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter Your Name",
    compnentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your email",
    compnentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    compnentType: "input",
    type: "password",
  },
];

export const loginForm = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your email",
    compnentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    compnentType: "input",
    type: "password",
  },
];

export const addProductElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter Product Title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter Product Description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    test: "Cat-Test",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kid", label: "Kid" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter Product Price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter Product Price(optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total Stock",
  },
];

export const headerMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/items",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/items",
  },
  {
    id: "kid",
    label: "Kid",
    path: "/shop/items",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/items",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/items",
  },
];

export const selectOptions = {
  Category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kid", label: "Kid" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  Brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];
