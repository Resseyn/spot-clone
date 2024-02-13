
export interface Song{
    "id":number,
    "author_id":string,
    "playlist_id":number,
    "title":string,
    "song_path":string,
    "image_path":string,
    "created_at":number
}
  
  export interface Product {
    id: string;
    active?: boolean;
    name?: string;
    description?: string;
    image?: string;
    //metadata?: Stripe.Metadata;
  }
  
  export interface Price {
    id: string;
    product_id?: string;
    active?: boolean;
    description?: string;
    unit_amount?: number;
    currency?: string;
    //type?: Stripe.Price.Type;
    //interval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number | null;
    //metadata?: Stripe.Metadata;
    products?: Product;
  }
  
  export interface Customer {
    id: string;
    stripe_customer_id?: string;
  }
  
  export interface UserDetails {
    uid: string;
    username?: string;
    image?: string;
    //billing_address?: Stripe.Address;
    //payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
  }
  
  export interface ProductWithPrice extends Product {
    prices?: Price[];
  }
  
  export interface Subscription {
    id: string;
    user_id: string;
    //status?: Stripe.Subscription.Status;
    //metadata?: Stripe.Metadata;
    price_id?: string;
    quantity?: number;
    cancel_at_period_end?: boolean;
    created: string;
    current_period_start: string;
    current_period_end: string;
    ended_at?: string;
    cancel_at?: string;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
    prices?: Price;
  }

