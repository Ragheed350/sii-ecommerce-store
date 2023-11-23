export interface Product {
  id: string
  name: string
  price: number
  image: string
  colors: string[]
  company: string
  description: string
  category: string
}

export interface ProductDetailsType {
  id: string
  stock: number
  price: number
  shipping: boolean
  colors: string[]
  category: string
  images: Image[]
  reviews: number
  stars: number
  name: string
  description: string
  company: string
}

export interface Image {
  id: string
  width: number
  height: number
  url: string
  filename: string
  size: number
  type: string
  thumbnails: Thumbnails
}

export interface Thumbnails {
  small: Small
  large: Large
  full: Full
}

export interface Small {
  url: string
  width: number
  height: number
}

export interface Large {
  url: string
  width: number
  height: number
}

export interface Full {
  url: string
  width: number
  height: number
}
