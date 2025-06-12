module default {
  # Ranks
  type Rank {
    required name: str {
      constraint exclusive;
    };
    required qualification_volume: int64;
    required commission_rate: float64;
    created_at: datetime {
      default := datetime_current();
    };
    updated_at: datetime {
      default := datetime_current();
    };
  }

  # Users
  type User {
    required username: str {
      constraint exclusive;
    };
    required email: str {
      constraint exclusive;
    };
    required password: str;
    required first_name: str;
    required last_name: str;
    phone: str;
    address: str;
    city: str;
    state: str;
    country: str;
    postal_code: str;
    sponsor: optional link User;
    required rank: link Rank;
    required status: str {
      constraint one_of(['active', 'inactive', 'suspended']);
      default := 'active';
    };
    created_at: datetime {
      default := datetime_current();
    };
    updated_at: datetime {
      default := datetime_current();
    };

    # Relationships
    multi link achievements := .<user[is Achievement];
    multi link commissions := .<user[is Commission];
    multi link orders := .<user[is Order];
    multi link network_positions := .<user[is NetworkPosition];
    link user_settings := .<user[is UserSettings];
    link kyc_verification := .<user[is KycVerification];
  }

  # User Settings
  type UserSettings {
    required user: link User {
      constraint exclusive;
    };
    required email_notifications: bool {
      default := true;
    };
    required sms_notifications: bool {
      default := false;
    };
    required team_updates: bool {
      default := true;
    };
    required commission_alerts: bool {
      default := true;
    };
    required rank_changes: bool {
      default := true;
    };
    required promotions: bool {
      default := false;
    };
    required two_factor_auth: bool {
      default := false;
    };
    required login_alerts: bool {
      default := true;
    };
    required session_timeout: int64 {
      default := 30;
    };
    required payment_method: str {
      constraint one_of(['direct_deposit', 'paypal', 'check']);
      default := 'direct_deposit';
    };
    account_name: str;
    account_number: str;
    routing_number: str;
    required auto_withdraw: bool {
      default := false;
    };
    required min_withdraw_amount: float64 {
      default := 100.00;
    };
    created_at: datetime {
      default := datetime_current();
    };
    updated_at: datetime {
      default := datetime_current();
    };
  }

  # Network Positions (Binary Tree)
  type NetworkPosition {
    required user: link User;
    parent: optional link NetworkPosition;
    required position: str {
      constraint one_of(['left', 'right']);
    };
    left_child: optional link NetworkPosition;
    right_child: optional link NetworkPosition;
    required left_volume: float64 {
      default := 0.00;
    };
    required right_volume: float64 {
      default := 0.00;
    };
    required total_volume: float64 {
      default := 0.00;
    };
    required level: int64 {
      default := 1;
    };
    created_at: datetime {
      default := datetime_current();
    };
    updated_at: datetime {
      default := datetime_current();
    };
  }

  # Products
  type Product {
    required name: str;
    description: str;
    required price: float64;
    required pv: int64; # Product Volume
    required category: str;
    image_url: str;
    required status: str {
      constraint one_of(['active', 'inactive', 'out_of_stock']);
      default := 'active';
    };
    created_at: datetime {
      default := datetime_current();
    };
    updated_at: datetime {
      default := datetime_current();
    };
    
    # Relationships
    link inventory := .<product[is ProductInventory];
    multi link order_items := .<product[is OrderItem];
  }

  # Product Inventory
  type ProductInventory {
    required product: link Product {
      constraint exclusive;
    };
    required quantity: int64 {
      default := 0;
    };
    last_restock_date: datetime;
    created_at: datetime {
      default := datetime_current();
    };
    updated_at: datetime {
      default := datetime_current();
    };
  }

  # Orders
  type Order {
    required user: link User;
    required order_number: str {
      constraint exclusive;
    };
    required total_amount: float64;
    required total_pv: int64;
    required status: str {
      constraint one_of(['pending', 'processing', 'shipped', 'delivered', 'cancelled']);
      default := 'pending';
    };
    required payment_status: str {
      constraint one_of(['pending', 'paid', 'failed', 'refunded']);
      default := 'pending';
    };
    shipping_address: str;
    shipping_city: str;
    shipping_state: str;
    shipping_country: str;
    shipping_postal_code: str;
    tracking_number: str;
    notes: str;
    created_at: datetime {
      default := datetime_current();
    };
    updated_at: datetime {
      default := datetime_current();
    };
    
    # Relationships
    multi link order_items := .<order[is OrderItem];
    multi link commissions := .<order[is Commission];
  }

  # Order Items
  type OrderItem {
    required order: link Order;
    required product: link Product;
    required quantity: int64;
    required price: float64;
    required pv: int64;
    created_at: datetime {
      default := datetime_current();
    };
  }

  # Commissions
  type Commission {
    required user: link User;
    order: optional link Order;
    required amount: float64;
    required type: str {
      constraint one_of(['direct', 'binary', 'matching', 'leadership', 'fast_start', 'rank_advancement']);
    };
    required status: str {
      constraint one_of(['pending', 'approved', 'paid', 'rejected']);
      default := 'pending';
    };
    description: str;
    created_at: datetime {
      default := datetime_current();
    };
    updated_at: datetime {
      default := datetime_current();
    };
  }

  # Achievements
  type Achievement {
    required user: link User;
    required title: str;
    description: str;
    required type: str {
      constraint one_of(['rank', 'team', 'sales', 'bonus']);
    };
    achieved_at: datetime {
      default := datetime_current();
    };
  }

  # KYC Verifications
  type KycVerification {
    required user: link User {
      constraint exclusive;
    };
    required reference_id: str {
      constraint exclusive;
    };
    id_document_url: str;
    address_document_url: str;
    selfie_url: str;
    required status: str {
      constraint one_of(['not_started', 'pending', 'verified', 'rejected']);
      default := 'not_started';
    };
    required document_submission_status: str {
      constraint one_of(['not_started', 'in_progress', 'completed', 'failed']);
      default := 'not_started';
    };
    required initial_review_status: str {
      constraint one_of(['not_started', 'in_progress', 'completed', 'failed']);
      default := 'not_started';
    };
    required identity_verification_status: str {
      constraint one_of(['not_started', 'in_progress', 'completed', 'failed']);
      default := 'not_started';
    };
    required address_verification_status: str {
      constraint one_of(['not_started', 'in_progress', 'completed', 'failed']);
      default := 'not_started';
    };
    required final_approval_status: str {
      constraint one_of(['not_started', 'in_progress', 'completed', 'failed']);
      default := 'not_started';
    };
    rejection_reason: str;
    notes: str;
    created_at: datetime {
      default := datetime_current();
    };
    updated_at: datetime {
      default := datetime_current();
    };
  }

  # Communications
  type Communication {
    required sender: link User;
    required message: str;
    required is_system: bool {
      default := false;
    };
    created_at: datetime {
      default := datetime_current();
    };
    
    # Relationships
    multi link user_communications := .<communication[is UserCommunication];
  }

  # User Communications (read status)
  type UserCommunication {
    required user: link User;
    required communication: link Communication;
    required is_read: bool {
      default := false;
    };
    created_at: datetime {
      default := datetime_current();
    };
  }

  type User {
    required property username -> str;
    required property email -> str {
      constraint exclusive;
    }
    property password -> str;
    property firstName -> str;
    property lastName -> str;
    property status -> str;
    link rank -> Rank;
  }

  type Rank {
    required property name -> str;
    property description -> str;
    property level -> int64;
  }

  # Other types would go here...
}
