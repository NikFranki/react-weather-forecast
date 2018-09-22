export interface PayloadedAction<TType, TPayload> {
    type: TType;
    payload: TPayload;
}

export interface Action<TType> {
    type: TType;
}