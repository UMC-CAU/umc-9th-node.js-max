export class DuplicateUserEmailError extends Error {
    constructor(reason, data) {
        super(reason);
        this.errorCode = "U001";
        this.reason = reason;
        this.data = data;
    }
}
export class RestaurantAddError extends Error {
    constructor(reason, data) {
        super(reason);
        this.errorCode = "R001";
        this.reason = reason;
        this.data = data;
    }
}
export class RestaurantNotFoundError extends Error {
    constructor(reason, data) {
        super(reason);
        this.errorCode = "R002";
        this.reason = reason;
        this.data = data;
    }
}
export class DuplicateMissionError extends Error {
    constructor(reason, data) {
        super(reason);
        this.errorCode = "M001";
        this.reason = reason;
        this.data = data;
    }
}
