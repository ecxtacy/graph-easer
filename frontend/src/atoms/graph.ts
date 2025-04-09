import { NodePoint } from "@/interfaces/NodePoint";
import { atom } from "jotai";

export const adjListAtom = atom<number[][] | null>(null);
export const edgeListAtom = atom<Set<string> | null>(null);
