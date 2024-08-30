import { InputHTMLAttributes } from "react";
import { RefCallBack } from "react-hook-form";

interface IClientInputProps {
  reference: RefCallBack;
}

const ClientInput = (
  props: IClientInputProps & InputHTMLAttributes<HTMLInputElement>
) => {
  const { className, reference, ...restProps } = props;
  return (
    <input
      {...restProps}
      ref={reference}
      className={`shadow-sm text-slate-800 font-medium p-3 text-lg border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 ${
        className ?? ""
      }`}
    />
  );
};

export default ClientInput;