import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface DatosFecha {
  'id' : bigint,
  'day' : bigint,
  'month' : bigint,
  'year' : bigint,
}
export interface Info {
  'name' : string,
  'note' : string,
  'description' : string,
  'activity' : string,
}
export type User = Principal;
export interface _SERVICE {
  'deleteActivity' : ActorMethod<[Principal, string], boolean>,
  'getActivity' : ActorMethod<[Principal, string], [] | [Info]>,
  'getActivitys' : ActorMethod<[User], Array<[string, Info]>>,
  'getUser' : ActorMethod<[], Principal>,
  'saveActivity' : ActorMethod<[DatosFecha, Info], Info>,
  'updateActivity' : ActorMethod<[Principal, string, Info], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
