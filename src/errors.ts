
export class DuplicateUserEmailError extends Error {
  errorCode = "U001";
  reason: string;
  data: any;

  constructor(reason: string, data: any) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class RestaurantAddError extends Error {
  errorCode = "R001";
  reason: string;
  data: any;

  constructor(reason: string, data: any) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class RestaurantNotFoundError extends Error {
  errorCode = "R002";
  reason: string;
  data: any;

  constructor(reason: string, data: any) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class DuplicateMissionError extends Error {
  errorCode = "M001"; 
  reason: string;
  data: any;

  constructor(reason: string, data: any) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}