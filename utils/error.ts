export enum KDError {
  /**Return when a quantity is at the allowed limit. */
  LIMIT_HIT = 'limit_hit',
  UNKNOWN = 'unknown',
}

export enum UserError {
  INVALID_PASSWORD = 'invalid_password',
  NOT_OWNER = 'not_owner',
}

export enum PropertyError {
  OPEN_TRANSFERS = 'open_transfers',
}
