import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store.ts";

type DispatchFunction = () => AppDispatch;

export const useCarDispatch: DispatchFunction = useDispatch;
export const useCarSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilterDispatch: DispatchFunction = useDispatch;
export const useFilterSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUserDispatch: DispatchFunction = useDispatch;
export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useModalDispatch: DispatchFunction = useDispatch;
export const useModalSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthDispatch: DispatchFunction = useDispatch;
export const useAuthSelector: TypedUseSelectorHook<RootState> = useSelector;
