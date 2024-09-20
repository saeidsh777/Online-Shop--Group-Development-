'use client';
import InputValidationError from '@/components/Alert/InputValidationError/InputValidationError';
import { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { RiEyeCloseLine } from 'react-icons/ri';

export default function AuthInput({ register, ...props }) {
    const [show, setShow] = useState(false);
    return (
        <div className="mt-2 relative">
            <input
                {...register}
                className="Auth_Input"
                {...props}
                type={
                    props.type === 'password'
                        ? show
                            ? 'text'
                            : 'password'
                        : props.type
                }
            />
            {props.errors[props.name] && (
                <InputValidationError
                    title={props.errors[props.name].message}
                    textColorClassName="text-red-500"
                />
            )}
            {props.type === 'password' ? (
                show ? (
                    <BsEye
                        className="absolute top-3.5 right-2 cursor-pointer"
                        onClick={() => setShow(prv => !prv)}
                    />
                ) : (
                    <RiEyeCloseLine
                        className="absolute top-3.5 right-2 cursor-pointer"
                        onClick={() => setShow(prv => !prv)}
                    />
                )
            ) : null}
        </div>
    );
}
