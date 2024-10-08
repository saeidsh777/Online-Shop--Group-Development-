export const emailRegex =
/^(?=.{1,256})(?=.{1,64}@.{1,255}$)(?=\S+$)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/;

export const phoneNumberRegex = /^09[0-9]{9}$/;

export const justNumberRegex = /[\d*\.?\d*]+/;